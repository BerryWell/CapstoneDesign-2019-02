
const { app } = require('./app');
const { queryAsync } = require('./connection');

app.post('/addmarket', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { rows, size_width, size_height } = req.body;
        //const result = await setFloor(JSON.stringify(rows), size_width, size_height, '1');

        //console.log(result);
        //res.send({ result });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});