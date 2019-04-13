const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`App is listening on port ${port}`) });

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

let compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));

var SocketServer = require('ws').Server,
    wss = new SocketServer({ server: app })

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message)
    })
    var clearIntervalId = setInterval(
        () => {
            try {
                ws.send(`${new Date()}`)
            }
            catch(error) {
                console.log("CLOSING CONNECTION... " + `${new Date()}`);
                ws.close();
                clearInterval(clearIntervalId);
            }
        },
        1000
    )
});

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.resolve(__dirname, 'dist')));