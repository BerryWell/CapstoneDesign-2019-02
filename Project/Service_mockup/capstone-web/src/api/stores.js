import axios from 'axios';

export async function getStores(userId) {
    const res = await axios.get('http://localhost:3000/stores?userid=' + userId);
    return res.data;
}

export async function appendStore(store) {
    const res = await axios.post('http://localhost:3000/store', store);
    return res.data;
}

export async function signUp(profile) {
    const res = await axios.post('http://localhost:3000/signup', profile);
    return res.data;
}
export async function signIn(profile) {
    const res = await axios.post('http://localhost:3000/signin', profile);
    return res.data;
}
export async function getCategory(marketId) {
    const res = await axios.get('http://localhost:3000/category?marketid=' + marketId);
    return res.data;
}
export async function getStocks(mallId) {
    const res = await axios.get('http://localhost:3000/dashboard_quantity/' + mallId);
    return res.data;
}
export async function getPopularity(mallId) {
    const res = await axios.get('http://localhost:3000/markets/popularity/' + mallId);
    return res.data;
}
export async function setMarketLayout(rows, mallId) {
    const res = await axios.post('http://localhost:3000/marketplan',
        { "rows": rows, "mallId": mallId });
    return res.data;
}
export async function addMarketInfo(info) {
    console.log(info)
    const res = await axios.post('http://localhost:3000/addmarket', info);
    return res.data;
}
export async function addMarketItemInfo(info, marketId, userId) {
    let data = { data: info, marketId: marketId, userId: userId }
    const res = await axios.post('http://localhost:3000/addmarketitem', data);
    return res.data;
}

export async function uploadItems(data, marketId) {
    const res = await axios.post('http://localhost:3000/uploadItems',
        { "data": data, "marketId": marketId });
    return res.data;
}

export async function modifyMalls(id, column, value) {
    const res = await axios.get('http://localhost:3000/modifyMalls',
        { "id": id, "column": column, "value": value });
    return res.data;
}

export async function deleteMalls(id) {
    const res = await axios.post('http://localhost:3000/deleteMalls', { "id": id });
    return res.data;
}
export async function testItemList() {
    const res = await axios.post('http://localhost:3000/itemstat/popularity',
        ["1", "2", "5", "3", "6", "4"]);
    return res.data;
}