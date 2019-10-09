const app = require('./app').app;

const stores = [
    {
        id: '0',
        name: '가게1',
        address: '서울시 강남구 논현1동',
        description: '가게 1입니다.',
    },
];

app.get('/stores', (req, res) => {
    responseStores(res);
});
app.post('/store', (req, res) => {
    stores.push(req.body);
    responseStores(res);
});

function responseStores(res) {
    res.set({ 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(stores));
}
