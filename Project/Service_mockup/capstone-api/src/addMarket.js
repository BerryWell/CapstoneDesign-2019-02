
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
async function setItemList(items, categories, idmall) {
    //층이 여러개이므로 다수의 idfloor 리턴
    let result = await queryAsync('SELECT idfloor FROM floor WHERE mall_idmall = ?', idmall);
    console.log(result);
    console.log(items);
    console.log(categories);


    //await setCategoryList(categories); // queryAsync('SELECT idcategory FROM category WHERE floor_idfloor = ?', floorId);

    //let categoryId = await queryAsync('SELECT idcategory FROM category WHERE ')
    for (let i = 0; i < result.length; i++) {
        let floorId = result[i].idfloor;

        //  console.log(result2);
    }

    return;
    for (let i = 0; i < result.length; i++) {
        //각 층에 있는 category의 id값 리턴
        let id = await queryAsync('SELECT idcategory FROM category WHERE floor_idfloor = ?', result[i]);

    }

    return await queryAsync('INSERT INTO item (name, floor_idfloor, quantity, category_idcategory) values (?, ?, 0, ?)', [floorInfo]);
    //category, item테이블에 카테고리, 아이템 추가해야함
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
                        items[category.name].push([item.name, floorNum]);
                    }
                }
            }
        }
    }
    try {
        //await setCategoryList(categories, mallId);
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
                    await queryAsync('INSERT INTO item (name, category_idcategory, floor_idfloor) values (?, ?, ?)', [item[0], categoryMap[categoryName], floorId]);
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