import axios from 'axios';

export async function getStores() {
    const res = await axios.get('http://localhost:3000/stores');
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
export async function getCategory() {
    const res = await axios.get('http://localhost:3000/category');
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