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
export async function getStocks(profile) {
    const res = await axios.get('http://localhost:3000/dashboard_quantity', profile);
    return res.data;
}
export async function setMarketLayout(rows, userId, size_width, size_height) {
    const res = await axios.post('http://localhost:3000/marketplan',
        { "rows": rows, "userId": userId, "size_width": size_width, "size_height": size_height });
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

export async function uploadItems(item, quantity) {
    const res = await axios.post('http://localhost:3000/uploadItems',
        { "item": item, "quantity": quantity });
    return res.data;
}