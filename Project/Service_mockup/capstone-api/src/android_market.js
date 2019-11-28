
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

app.get('markets/:id', async (req, res) => {
    let id = req.params.id;


});