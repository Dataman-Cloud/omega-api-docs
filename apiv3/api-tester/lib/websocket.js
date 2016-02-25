var WebSocketClient = require('websocket').client;

module.exports = function(url, auth, callback) {
    var client = new WebSocketClient();

    client.on('connectFailed', function (error) {
        console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function (connection) {
        console.log('   WebSocket Client Connected');
        connection.on('error', function (error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', function () {
            console.log('Connection Closed');
        });
        connection.on('message', function (message) {
            console.log(message)
            //if (message.type === 'utf8') {
            //    console.log("Received: '" + message.utf8Data + "'");
            //}
            connection.close();
            callback && callback();
        });

        function sendNumber() {
            if (connection.connected) {
                var number = Math.round(Math.random() * 0xFFFFFF);
                connection.sendUTF(number.toString());
                setTimeout(sendNumber, 1000);
            }
        }

        sendNumber();
    });

    client.connect(url + auth);
};
