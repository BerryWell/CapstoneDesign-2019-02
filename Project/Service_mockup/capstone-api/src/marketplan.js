// a query for floor plan
// marketplan.js 페이지를 위한 API

const { app } = require('./app');
const { queryAsync } = require('./connection');

app.post('/marketplan', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {

        const { rows, mallId } = req.body;
        let floorIds = await queryAsync('SELECT idfloor FROM floor WHERE mall_idmall = ?', [mallId]);
        //0번쨰 층 null 제거
        rows.shift();
        console.log(rows);

        for (let i = 0; i < rows.length; i++) {
            if (!rows[i])
                continue;
            console.log(floorIds[i].idfloor);
            await setFloor(JSON.stringify(rows[i]), floorIds[i].idfloor);
        }
        res.status(202).send({ result: "OK" });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
async function setFloor(map, floorId) {
    return await queryAsync(
        'UPDATE floor SET map = ? WHERE idfloor = ?', [map, floorId]);
}
app.get('/marketplan', async (req, res) => {
    try {
        const requestid = req.query.id;
        const floor = req.query.floor;// 테이블에 플로어 id만 있고 해당 플로어가 몇층인지 없음. 
        const mallId = req.query.mallId;
        console.log(floor);
        const result = await getMap(requestid, mallId, floor);
        console.log(result);
        res.send(result[0].map);
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});

async function getMap(idfloor, mallId, floor) {
    return await queryAsync(
        'SELECT map FROM floor WHERE idfloor = ? AND mall_idmall = ?',
        [idfloor, mallId]
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