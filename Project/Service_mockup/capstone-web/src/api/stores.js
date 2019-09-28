export async function getStores() {
    const response = await fetch('http://localhost:3000/stores', {
        method: 'get',
    });
    return await response.json();
}

export async function appendStore(store) {
    const response = await fetch('http://localhost:3000/store', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(store)
    });
    return await response.json();
}
