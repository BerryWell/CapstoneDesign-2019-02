
const { app } = require('./app');
const { queryAsync } = require('./connection');


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