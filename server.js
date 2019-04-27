const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    app = express(),
    port = process.env.PORT || 3000;

const usersBackendStore = require('./backend/users');
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

const WebSocket = require('ws');

var SocketServer = WebSocket.Server,
    wss = new SocketServer({ server: server })

wss.on('connection', function (ws) {

    var newUser = {
        id: uuidv4(),
        name: generateName()
    };

    usersBackendStore.store.addUser(newUser);
    var users = usersBackendStore.store.users;
    
    ws.send(JSON.stringify({
        type: "ME",
        data: newUser
    }));

    ws.send(JSON.stringify({
        type: "USERS",
        data: users
    }));

    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
              type: "USER_JOINED",
              data: newUser
          }));
        }
      });

    ws.on('message', function (message) {
        console.log('received: %s', message)
    })

    ws.on('close', function () {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                  type: "USER_LEFT",
                  data: newUser
              }));
            }
          });
          usersBackendStore.store.removeUser(newUser);
    });

    // var clearIntervalId = setInterval(
    //     () => {
    //         try {
    //             ws.send(`${new Date()}`)
    //         }
    //         catch(error) {
    //             console.log("CLOSING CONNECTION... " + `${new Date()}`);
    //             ws.close();
    //             clearInterval(clearIntervalId);
    //         }
    //     },
    //     1000
    // )
});

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.resolve(__dirname, 'dist')));