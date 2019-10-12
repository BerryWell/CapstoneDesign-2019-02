// a query for floor plan
// marketplan.js 페이지를 위한 API

const { app } = require('./app');
const { queryAsync } = require('./connection');


app.post('/marketplan', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { requestid } = req.body;
        const result = await getMap(idfloor);
        console.log({ result });
        res.send({ result });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});

async function getMap() {
    return await queryAsync(
        'SELECT map FROM WHERE idfloor = ?',
        [idfloor]
    );
}
