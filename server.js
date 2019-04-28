const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    app = express(),
    port = process.env.PORT || 3000;

const usersBackendStore = require('./backend-data-stores/users');
const messagesBackendStore = require('./backend-data-stores/messages');
const generateName = require('sillyname');
const uuidv4 = require('uuid/v4');

// 🎉 https://stackoverflow.com/questions/53485713/node-js-with-express-and-websocket-giving-error-during-websocket-handshake-unex
const server = app.listen(port, () => { console.log(`App is listening on port ${port}`) });

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

let compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));

/**
 * 1 SETUP THE WEBSERVER
 */

const WebSocket = require('ws');

var SocketServer = WebSocket.Server,
    wss = new SocketServer({ server: server })

wss.on('connection', function (ws) {

    /**
     * 6 BROADCAST FUNCTIONS
     */
    const broadcastOthers = (message) => {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    const broadcastAll = (message) => {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    /**
     * 3 CREATE A USER AND SEND IT TO THE CLIENT
     */

    var newUser = {
        id: uuidv4(),
        name: generateName()
    };

    usersBackendStore.store.addUser(newUser);
    var users = usersBackendStore.store.users;
    var messages = messagesBackendStore.store.messages;

    ws.send(JSON.stringify({
        type: "ME",
        data: newUser
    }));

    /**
     * 5 SEND USERS TO CLIENT
     */

    ws.send(JSON.stringify({
        type: "USERS",
        data: users
    }));

    /**
     * 8 SEND ALL MESSAGES TO THE CLIENT
     */
    ws.send(JSON.stringify({
        type: "MESSAGES",
        data: messages
    }));

    /**
     * 7 BROADCAST USER JOINED/LEFT
     */
    broadcastOthers(JSON.stringify({
        type: "USER_JOINED",
        data: newUser
    }));

    ws.on('close', function () {
        broadcastOthers(JSON.stringify({
            type: "USER_LEFT",
            data: newUser
        }));
        usersBackendStore.store.removeUser(newUser);
    });

    /**
     * 9 RECEIVE NEW MESSAGES AND BROADCAST THEM
     */
    ws.on('message', function (message) {
        console.log('received: %s', message)

        const newMessage = {
            id: uuidv4(),
            user: newUser,
            content: message
        };

        messagesBackendStore.store.addMessage(newMessage);
        broadcastAll(JSON.stringify({
            type: "NEW_MESSAGE",
            data: newMessage
        }));
    })

    /**
     * 10 PING
     */
    var clearIntervalId = setInterval(
        () => {
            try {
                ws.send(JSON.stringify({
                    type: "PING"
                }));
            }
            catch (error) {
                console.log("CLOSING CONNECTION OF " + newUser.name);
                ws.close();
                clearInterval(clearIntervalId);
            }
        }, 10000
    )
});

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.resolve(__dirname, 'dist')));