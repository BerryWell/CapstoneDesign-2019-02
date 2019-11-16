
const { app } = require('./app');
const { queryAsync } = require('./connection');

async function addMallInfo(name, address, lat, lng, max_floor, id) {
    return await queryAsync(
        'INSERT INTO mall (name, address, latitude, longitude, max_floor, member_manager_idmember_manager) values (?, ?, ?, ?, ?, ?)',
        [name, address, lat, lng, max_floor, id]
    );
}
async function addFloorInfos(value) {
    return await queryAsync('INSERT INTO floor (mall_idmall, number) VALUES ?;', [value]);
}
app.post('/addmarket', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { name, address, addressFromLatLng, lat, lng, maxFloor, userId } = req.body;
        let allAddress = addressFromLatLng + " " + address;

        const result = await addMallInfo(name, allAddress, lat, lng, maxFloor, userId);
        const mallId = result.insertId;
        let values = [];
        for (let i = 1; i <= maxFloor; i++) {
            values.push([mallId, i.toString()]);
        }
        await addFloorInfos(values);
        res.send({ mallId });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
async function setCategoryList(categoryInfo) {
    return await queryAsync('INSERT INTO category (name, floor_idfloor) values ?', [categoryInfo]);
}
async function setItemList(floorInfo) {
    return await queryAsync('INSERT INTO item (name, floor_idfloor, quantity, category_idcategory) values (?, ?, 0, ?)', [floorInfo]);
    //category, item테이블에 카테고리, 아이템 추가해야함
}
//async function get
app.post('/addmarketitem', async (req, res) => {
    let categories = [];
    let items = {};
    for (let i = 0; i < req.body.data.length; i++) {
        let floorNum = (i + 1).toString();
        let curFloor = req.body.data[i];

        if (curFloor.children) {
            for (let j = 0; j < curFloor.children.length; j++) {
                let category = curFloor.children[j];
                categories.push([category.name, floorNum]);
                if (category.children) {
                    items[category.name] = [];
                    for (let k = 0; k < category.children.length; k++) {
                        let item = category.children[k];
                        items[category.name].push([item.name, floorNum]);
                    }
                }
            }
        }
    }
    try {
        console.log(JSON.stringify(categories));
        const result = await setCategoryList(categories);

        console.log({ result_: result });
    }
    catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed during setting category' });
    }
    try {

    }
    catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed during setting item' });
    }
    console.log(JSON.stringify(items));
    console.log(req.body);
});