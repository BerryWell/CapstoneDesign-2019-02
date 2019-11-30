const app = require('./app').app;
const { queryAsync } = require('./connection');

const stores = [
    {
        id: '0',
        name: '가게1',
        address: '서울시 강남구 논현1동',
        description: '가게 1입니다.',
    },
];
async function getMallById(userId) {
    return await queryAsync('SELECT idmall, name, address, max_floor \
    FROM mall \
    WHERE member_manager_idmember_manager = ?', [userId]);
}
app.get('/stores', async (req, res) => {
    try {
        const result = await getMallById(req.query.userid);
        console.log(result);
        res.send({ result });
    }
    catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
app.post('/store', (req, res) => {
    stores.push(req.body);
    responseStores(res);
});

function responseStores(res) {
    res.set({ 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(stores));
}
