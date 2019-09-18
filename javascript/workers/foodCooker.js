var amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://guest:guest@localhost:5672';
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.consume('cookFood',
            function (msg) {
                console.log('.....');
                setTimeout(function () {
                        console.log("Message:", msg.content.toString());
                        ch.sendToQueue("packageFood", new Buffer(data), {
                            persistent: true
                        });
                }, 4000);
            }, {
                noAck: true
            });
    });
});