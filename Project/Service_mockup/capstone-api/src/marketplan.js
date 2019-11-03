// a query for floor plan
// marketplan.js 페이지를 위한 API

const { app } = require('./app');
const { queryAsync } = require('./connection');

app.post('/marketplan', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { rows, size_width, size_height } = req.body;
        const result = await setFloor(JSON.stringify(rows), size_width, size_height, '1');

        console.log(result);
        res.send({ result });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
async function setFloor(map, size_width, size_height, mall_idmall) {
    return await queryAsync(
        'INSERT INTO floor \
            (map,\
                size_width,\
                size_height,\
                mall_idmall)\
                values (?, ?, ?, ?)',
        [map, size_width, size_height, mall_idmall]);
}
app.get('/marketplan', async (req, res) => {
    try {
        const requestid = req.query.id;
        const floor = req.query.floor;// 테이블에 플로어 id만 있고 해당 플로어가 몇층인지 없음. 
        const result = await getMap(requestid);
        console.log(result[0].map);
        res.send(result[0].map);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});

async function getMap(idfloor) {
    return await queryAsync(
        'SELECT map FROM floor WHERE idfloor = ?',
        [idfloor]
    );
}

app.get('/getItems', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { requestid } = req.body;
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
})