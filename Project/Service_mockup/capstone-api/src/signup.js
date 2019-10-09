const { promisify } = require('util');
const bcrypt = require('bcryptjs');

const { app } = require('./app');
const { queryAsync } = require('./connection');

const hashAsync = promisify(bcrypt.hash.bind(bcrypt));

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

async function insertMember(id, password, name, address, phoneNumber) {
    const hash = await hashAsync(password, 10);
    return await queryAsync(
        'INSERT INTO member_manager\
            (username, \
                password, \
                name, \
                address, \
                email, \
                telephone, \
                mall_idmall) values (?, ?, ?, ?, ?, ?, ?)',
        [id, hash, name, address, '', phoneNumber, 1]
    );
}
