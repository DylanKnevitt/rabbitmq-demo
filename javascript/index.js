const express = require('express')
const app = express()
let bodyParser = require('body-parser')
const port = 3000;
const publishToQueue = require('./MQService');

//queue names
const checkStock = 'checkStock'
const cookFood = 'cookFood'
const packageFood = 'packageFood'
const deliverToClient = 'deliverToClient'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/orderFood', async (req, res, next) => {
    await publishToQueue(checkStock, JSON.stringify(req.body)).then( (blah) =>{
        console.log(blah);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));