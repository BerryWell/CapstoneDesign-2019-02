const bcrypt = require('bcryptjs');

const app = require('./app').app;

app.post('/signup', (req, res) => {
    console.log('req.body: ' + req.body.toString());
    console.log('res.body: ' + res.body);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        connection.query(
            'INSERT INTO member_manager\
                (username, \
                 password, \
                 name, \
                 address, \
                 email, \
                 telephone, \
                 mall_idmall) values (?, ?, ?, ?, ?, ?, ?)',
            [
                req.body.id,
                hash,
                req.body.name,
                req.body.address,
                '',
                req.body.phoneNumber,
                1

            ],
            (err, result) => {
                if (err === null) {
                    console.log('err: ' + err);
                }
                else {
                    console.log('result:');
                    console.log(result);
                    res.writeHead(301, { Location: 'http://localhost:3000' });
                }
            }
        );
    });
});
