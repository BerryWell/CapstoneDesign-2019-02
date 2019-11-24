
const { app } = require('./app');
const { queryAsync } = require('./connection');

app.get('/category', async (req, res) => {
    console.log(req.query);
    const ret = await getCategory(req.query.marketid);
    res.send(JSON.stringify(ret));
});
async function getCategory(marketid) {
    return await queryAsync('SELECT DISTINCT category.name, category.idcategory, floor.number FROM mall, floor, category WHERE floor.idfloor = category.floor_idfloor AND floor.mall_idmall = ?', [Number(marketid)]);
}