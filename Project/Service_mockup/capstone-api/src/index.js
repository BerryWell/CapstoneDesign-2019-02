const { promisify } = require('util');
const { app, port } = require('./app');
const { queryAsync } = require('./connection');
const { connection } = require('./connection');

require('./store');
require('./signup');
require('./marketplan');
require('./category.js');
require('./addMarket');
require('./android_market');
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

async function getItemsByMall(id) {
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

async function getItemsByFloor(id) {
    return await queryAsync(
        "SELECT idcategory, name \
        FROM category \
        WHERE floor_idfloor = ? \
            AND name NOT LIKE '%가판대'",
        [id]
    );
}

async function getItemsByCategory(id) {
    return await queryAsync(
        'SELECT iditem, name, category_idcategory \
        FROM item \
        WHERE floor_idfloor = ?',
        [id]
    );
}

// querystring 처리
// ex. http://localhost:3000/item_quantity?id=1
app.get('/item_quantity', async (req, res) => {
    console.log({ '/item_quantity': req.body });
    console.log({ '/item_quantity': req.query });
    try {
        const result = await getItemsByMall(req.query.id);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed! ' });
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


app.get('/item_quantity_by_floor', async (req, res) => {
    console.log({ '/item_quantity': req.body });
    console.log({ '/item_quantity': req.query });
    try {
        const result = await getItemsByFloor(req.query.id);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed! ' });
    }
});

app.get('/item_quantity_by_category', async (req, res) => {
    console.log({ '/item_quantity': req.body });
    console.log({ '/item_quantity': req.query });
    try {
        const result = await getItemsByCategory(req.query.id);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed! ' });
    }
});

async function uploadItems(item_name, quantity) {
    return await queryAsync(
        'INSERT INTO item(category_idcategory, name, quantity, floor_idfloor) \
        VALUES (1, ?, ?, 1) ',
        [item_name, quantity]
    );
}

app.post('/uploadItems', async (req, res) => {
    console.log({ '/uploadItems': req.body });
    console.log({ '/uploadItems': req.query });
    try {
        const result = await uploadItems(req.body.item, req.body.quantity);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed! ' });
    }
});

async function findMalls() {
    return await queryAsync(
        'SELECT idmall, name, latitude, longitude \
        FROM mall'
    );
}

app.get('/findMalls', async (req, res) => {
    console.log({ '/findMalls': req.body });
    console.log({ '/findMalls': req.query });
    try {
        const result = await findMalls();
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log({ err })
        res.status(403).send({ error: 'Something failed!' });
    }

})


async function modifyMalls(id, column, value) {
    return await queryAsync(
        'UPDATE mall \
        SET ? = ? \
        WHERE idmall = ?',
        [column, value, id]
    );
}

app.post('/modifyMalls', async (req, res) => {
    console.log({ '/modifyMalls': req.body });
    console.log({ '/modifyMalls': req.query });
    try {
        const result = await modifyMalls(req.query.id, req.query.column, req.query.value  );
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log({ err })
        res.status(403).send({ error: 'Something failed!' });
    }

})
// 쿼리에 on cascade 추가해서 외래키 제약 고려해야 함
async function deleteMalls(id) {
    return await queryAsync(
        'DELETE  \
        FROM mall \
        WHERE idmall = ?',
        [id]
    );
}

app.post('/deleteMalls', async (req, res) => {
    console.log({ 'req.body: /deleteMalls': req.body });
    console.log({ 'req.query: /deleteMalls': req.query });
    try {
        const result = await deleteMalls(req.body.id.idmall);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log({ err })
        res.status(403).send({ error: 'Something failed!' });
    }

})