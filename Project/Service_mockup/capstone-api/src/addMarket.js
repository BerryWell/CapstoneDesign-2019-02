
const { app } = require('./app');
const { queryAsync } = require('./connection');

async function getItemsByMall(name, address, lat, lng, max_floor){
    return await queryAsync(
        'INSERT INTO mall (name, address, latitude, longitude, max_floor) values (?, ?, ?, ?, ?)', 
        [name, address, lat, lng, max_floor]
    );
}
app.post('/addmarket', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { name, address, addressFromLatLng, lat, lng, max_floor } = req.body;
        let allAddress = addressFromLatLng + " " + address;

        const result = await getItemsByMall(name, allAddress, lat, lng, max_floor);

        console.log(result);
        res.send({ result });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});