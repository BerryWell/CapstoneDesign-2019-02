
const { app } = require('./app');
const { queryAsync } = require('./connection');

app.get('/category', async (req, res) => {
    const ret = await getCategory();
    res.send(JSON.stringify(ret));
});
async function getCategory(){
    return await queryAsync(
        'SELECT * FROM category'
    );
}