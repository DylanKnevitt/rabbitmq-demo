const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://guest:guest@localhost:5672';

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {

        ch = channel;
    });
});

 const publishToQueue = async (queueName, data) => {
     let options = {
         persistent : true
     }
    ch.sendToQueue(queueName, new Buffer(data),options);
}

module.exports = publishToQueue;