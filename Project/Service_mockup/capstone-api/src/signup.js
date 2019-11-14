const { promisify } = require('util');
const bcrypt = require('bcryptjs');

const { app } = require('./app');
const { queryAsync } = require('./connection');

const hashAsync = promisify(bcrypt.hash.bind(bcrypt));
const compareAsync = promisify(bcrypt.compare.bind(bcrypt));
app.post('/signup', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { id, password, name, address, phoneNumber } = req.body;
        const result = await insertMember(id, password, name, address, phoneNumber);
        console.log({ result });
        res.send({ result });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
app.post('/signin', async(req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { id, password, } = req.body;
        const result = await findMember(id, password);

        console.log({ result });
        res.send({ result });
    } catch (err) {
        res.status(403).send({ error: 'Something failed!' });
    }
});

async function findMember(id, password){
    let result = await queryAsync(
        'SELECT password FROM member_manager WHERE username=?',
        [id]
    );
    
    let compResult = await compareAsync(password, result[0].password);
    console.log(compResult);
    if(compResult===true){
        return JSON.stringify("OK");
    }
    else throw null;
}
async function insertMember(id, password, name, address, phoneNumber) {
    const hash = await hashAsync(password, 10);
    return await queryAsync(
        'INSERT INTO member_manager\
            (username, \
                password, \
                name, \
                address, \
                email, \
                telephone) values (?, ?, ?, ?, ?, ?)',
        [id, hash, name, address, '', phoneNumber]
    );
}
