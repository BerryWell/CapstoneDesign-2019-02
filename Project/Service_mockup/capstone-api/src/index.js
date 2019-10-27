const { promisify } = require('util');
const { app, port } = require('./app');
const { queryAsync } = require('./connection');
const { connection } = require('./connection');

require('./store');
require('./signup');

connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// API for Android
app.get('/', (req, res) => res.send(JSON.stringify('Hello World!')));

app.get('/items', async(req, res) => {
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
        'SELECT category.name as category, item.name as item \
        FROM category, item \
        WHERE category.idcategory = item.category_idcategory'
    );
}

app.get('/dashboard_quantity', async(req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const result = await findItems();
        console.log(result);
        res.send(result);
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