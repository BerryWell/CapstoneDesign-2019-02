
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
async function setCategoryList(categoryInfo, idmall) {
    return await queryAsync('INSERT INTO category (name, floor_idfloor) values ?', [categoryInfo]);
}
//async function get
app.post('/addmarketitem', async (req, res) => {
    let categories = [];
    let items = {};
    let mallId = req.body.marketId;
    let floorInfo = await queryAsync('SELECT idfloor, number FROM floor WHERE mall_idmall = ?', mallId);
    let floorIdPair = {};//key:floor value:floorId
    for (let i = 0; i < floorInfo.length; i++) {
        let floorId = floorInfo[i].idfloor;
        let floor = floorInfo[i].number;
        floorIdPair[floor] = floorId;

    }
    console.log(floorIdPair);
    for (let i = 0; i < req.body.data.length; i++) {
        let floorNum = (i + 1).toString();
        let curFloor = req.body.data[i];

        if (curFloor.children) {
            for (let j = 0; j < curFloor.children.length; j++) {
                let category = curFloor.children[j];
                categories.push([category.name, floorIdPair[floorNum]]);
                if (category.children) {
                    items[category.name] = [];
                    for (let k = 0; k < category.children.length; k++) {
                        let item = category.children[k];
                        items[category.name].push([item.name, floorNum, item.quantity]);
                    }
                }
            }
        }
    }
    try {
        await setCategoryList(categories, mallId);
    }
    catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed during setting category' });
    }
    try {
        console.log(items);
        //각층
        for (const [floor, floorId] of Object.entries(floorIdPair)) {
            let categoryIds = await queryAsync('SELECT idcategory, name FROM category WHERE floor_idfloor  = ?', floorId);
            if (categoryIds.length == 0)
                continue;
            let categoryMap = {};
            categoryIds.map(element => categoryMap[element.name] = element.idcategory);

            //카테고리 내 아이템마다
            for (const [categoryName, categoryId] of Object.entries(categoryMap)) {
                if (!items[categoryName])
                    continue;
                for (let i = 0; i < items[categoryName].length; i++) {
                    let item = items[categoryName][i];
                    await queryAsync('INSERT INTO item (name, category_idcategory, floor_idfloor, quantity) values (?, ?, ?, ?)', [item[0], categoryMap[categoryName], floorId, item[2]]);
                }
            }
        }
        res.status(200).send({ result: "OK" });

    }
    catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed during setting item' });
    }
});