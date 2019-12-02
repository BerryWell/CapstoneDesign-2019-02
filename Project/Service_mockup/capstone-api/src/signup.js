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
        res.send({ result });
    } catch (err) {
        console.log({ err });
        res.status(403).send({ error: 'Something failed!' });
    }
});
app.post('/signin', async (req, res) => {
    console.log({ 'req.body': req.body });
    try {
        const { id, password, } = req.body;
        const result = await findMember(id, password);
        res.send({ "id": result });
    } catch (err) {
        res.status(403).send({ error: err });
    }
});

async function findMember(id, password) {
    let result = await queryAsync(
        'SELECT password, idmember_manager FROM member_manager WHERE username=?',
        [id]
    );

    let compResult = await compareAsync(password, result[0].password);
    if (compResult === true) {
        return result[0].idmember_manager;
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
