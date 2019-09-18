const uuidv1 = require('uuid/v1');
const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://guest:guest@localhost:5672';

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});



 const publishToQueue = async (queueName, data) => {
    
            ch.assertQueue('', {
                exclusive: true

            },
            function (error2, q) {
                if (error2) {
                    throw error2;
                }
                let correlationId = uuidv1();

                let options = {
                    persistent: true,
                    correlationId: correlationId,
                    replyTo: q.queue
                }

                ch.sendToQueue(queueName, new Buffer(data), options);


                ch.consume(q.queue, function (msg) {
                    if (msg.properties.correlationId == correlationId) {
                        console.log(' [.] Got %s', msg.content.toString());
                        setTimeout(function () {

                            conn.close();
                            //process.exit(0)
                            return msg;
                        }, 500);
                    }
                }, {
                    noAck: true
                }
                );
            });
    


}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});

module.exports = publishToQueue;