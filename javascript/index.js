const express = require('express')
const app = express()
let bodyParser = require('body-parser')
const port = 3000
const publishToQueue = require('./MQService');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.post('/msg', async (req, res, next) => {
    let {
        queueName,
        payload
    } = req.body;
    await publishToQueue(queueName, payload);
    res.statusCode = 200;
    res.data = {
        "message-sent": true
    };
    res.send();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));