
const { app } = require('./app');
const { queryAsync } = require('./connection');

async function addMallInfo(name, address, lat, lng, max_floor, id) {
    return await queryAsync(
        'INSERT INTO mall (name, address, latitude, longitude, max_floor, member_manager_idmember_manager) values (?, ?, ?, ?, ?, ?)',
        [name, address, lat, lng, max_floor, id]
    );
}
async function addFloorInfos(value) {
    return await queryAsync('INSERT INTO floor (mall_idmall, number) VALUES ?;', [value]);
}
app.post('/addmarket', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { name, address, addressFromLatLng, lat, lng, maxFloor, userId } = req.body;
        let allAddress = addressFromLatLng + " " + address;

        const result = await addMallInfo(name, allAddress, lat, lng, maxFloor, userId);
        const mallId = result.insertId;
        let values = [];
        for (let i = 1; i <= maxFloor; i++) {
            values.push([mallId, i.toString()]);
        }
        await addFloorInfos(values);
        res.send({ mallId });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
async function setItemList(floorInfo) {
    //category, item테이블에 카테고리, 아이템 추가해야함
}
app.post('/addmarketitem', async (req, res) => {

    console.log(req.body);
});