const { promisify } = require('util');
const { app, port } = require('./app');
const { queryAsync } = require('./connection');
const { connection } = require('./connection');

connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.get('/', async(req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const result = await findItems();
        console.log(result);
        res.send(JSON.stringify(result));
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});

async function findItems(){
    return await queryAsync(
        'SELECT name, quantity \
        FROM item'
    );
}