const { promisify } = require('util');
const { app, port } = require('./app');
const { queryAsync } = require('./connection');
const { connection } = require('./connection');

require('./store');
require('./signup');
require('./marketplan');
require('./category.js');
require('./addMarket');
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

app.get('/items', async (req, res) => {
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

async function findItems() {
    return await queryAsync(

        'SELECT category.name as category, item.name as item, item.quantity as quantity \
        FROM category, item \
        WHERE category.idcategory = item.category_idcategory'
        /*
       'SELECT category.name as category, SUM(item.quantity) as quantity \
        FROM category, item \
        WHERE category.idcategory = item.category_idcategory \
        GROUP BY category'
        */
    );
}

async function getItemsByMall(id){
    return await queryAsync(
        'SELECT floor.idfloor as id, GROUP_CONCAT(distinct category.name) as category, floor.number as floor \
        FROM category, floor \
        WHERE floor.mall_idmall = ? \
            AND floor.idfloor = category.floor_idfloor \
        GROUP BY id, floor \
        ORDER BY floor DESC', 
        [id]
    );
}   

// querystring 처리
// ex. http://localhost:3000/item_quantity?id=1
app.get('/item_quantity', async (req, res) => {
    console.log({'/item_quantity': req.body});
    console.log({'/item_quantity': req.query});
    try {
        const result = await getItemsByMall(req.query.id);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed! '});
    }
});

app.get('/dashboard_quantity', async (req, res) => {
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
