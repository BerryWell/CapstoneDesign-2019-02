
const { app } = require('./app');
const { queryAsync } = require('./connection');
const sqlConfig = require('./config');
const {promisify} = require('util');
const redis = require('redis');

let client = redis.createClient(6379, sqlConfig.development.redis.host);
client.auth(sqlConfig.development.redis.password);
const getAsync = promisify(client.get.bind(client));
client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});
app.post('/itemstat/popularity', async (req, res) => {
    let itemList = req.body;
    console.log(itemList);
    itemList.map(element => {
        client.exists(element, function(err, reply) {
            if (reply === 1) {
                client.incr(element);
            } else {
                client.set(element, 1);
            }
        });
    });
    res.status(200).send({OK:true});
});
app.get('/markets/popularity/:id', async (req, res) => {
    try{
        let resultList = await queryAsync('SELECT item.name, item.iditem FROM item, floor WHERE floor.mall_idmall = ? AND floor.idfloor = item.floor_idfloor', [req.params.id]);
       console.log({_resultList:resultList});
        let returnList = [];
        for(let i=0; i < resultList.length; i++){
            let element = resultList[i];
            let ret = await getAsync(element.iditem);
            console.log(ret);
            if(ret){
                returnList.push({name:element.name, count:ret});
            }
        }
        console.log({_returnList:returnList});
        res.status(200).send(returnList);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
app.get('/markets', async (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    let range = req.query.range;
    console.log(req.query);
    try {

        let mallInfos = await queryAsync('SELECT idmall, name, latitude, longitude FROM mall WHERE SQRT(POWER(latitude - ?, 2) + POWER(longitude - ?, 2)) < ?', [lat, long, range]);
        res.status(200).send(mallInfos);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});

app.get('/markets/:id', async (req, res) => {
    let id = req.params.id;
    try {

        let categories = await queryAsync('SELECT name, idcategory FROM category, floor WHERE floor.mall_idmall = ? AND category.floor_idfloor = floor.idfloor', [id]);
        let map = await queryAsync('SELECT map, number FROM floor WHERE floor.mall_idmall = ?', [id]);
        let items = await queryAsync('SELECT item.name, category_idcategory, item.floor_idfloor FROM item, floor WHERE item.floor_idfloor = floor.idfloor AND floor.mall_idmall = ?', [id]);
        res.status(200).send({ categories: categories, map: map, items: items });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});

app.get('/map/:id', async (req, res) => {
    let id = req.params.id;

    try {
        let result = await queryAsync('SELECT map FROM floor WHERE idfloor = ?', [id]);
        console.log(result);
        res.status(200).send(result[0]);
    }
    catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!', log: err });
    }
});
app.get('/flooritem/:id', async (req, res) => {
    let id = req.params.id;


    try {
        let result = await queryAsync('SELECT name, category_idcategory FROM item WHERE floor_idfloor = ?', [id]);
        console.log(result);
        res.status(200).send(result);
    }
    catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!', log: err });
    }
});