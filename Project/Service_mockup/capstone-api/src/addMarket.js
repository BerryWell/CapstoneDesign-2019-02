
const { app } = require('./app');
const { queryAsync } = require('./connection');

async function getItemsByMall(name, address, lat, lng, max_floor, id) {
    return await queryAsync(
        'INSERT INTO mall (name, address, latitude, longitude, max_floor, member_manager_idmember_manager) values (?, ?, ?, ?, ?, ?)',
        [name, address, lat, lng, max_floor, id]
    );
}
app.post('/addmarket', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { name, address, addressFromLatLng, lat, lng, maxFloor, userId } = req.body;
        let allAddress = addressFromLatLng + " " + address;

        const result = await getItemsByMall(name, allAddress, lat, lng, maxFloor, userId);

        console.log(result);
        res.send({ result });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
//async function setItemList()
app.post('/addmarketitem', async (req, res) => {

    console.log(req.body);
});