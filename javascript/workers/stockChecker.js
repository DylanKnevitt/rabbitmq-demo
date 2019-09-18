var amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://guest:guest@localhost:5672';
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.consume('checkStock',
            function (msg) {
                console.log('.....');
                setTimeout(function () {

                    let d = Math.random();
                    if (d < 0.1) {
                        console.log("No stock");
                        ch.sendToQueue(msg.properties.replyTo,
                        Buffer.from("No Stock"), {
                        correlationId: msg.properties.correlationId
                        });                
                    } else {
                        console.log("Message:", msg.content.toString());
                        ch.sendToQueue(msg.properties.replyTo,
                        Buffer.from("Your order has been placed, it will be ready shortly."), {
                        correlationId: msg.properties.correlationId
                        });
                        //ch.sendToQueue("cookFood", new Buffer(data), {
                        //    persistent: true
                        //});
                    }
                     ch.ack(msg);

                }, 4000);
            }, {
                noAck: true
            });
    });
});