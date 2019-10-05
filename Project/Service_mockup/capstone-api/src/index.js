const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const sqlConfig = require('./config');
const mysql = require('mysql');
const app = express();
const bcrypt = require('bcrypt');
app.use(cors());
app.use(bodyParser.json());

const stores = [
    {
        id: '0',
        name: '가게1',
        address: '서울시 강남구 논현1동',
        description: '가게 1입니다.',
    },
];
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/stores', (req, res) => {
    responseStores(res);
});
app.post('/store', (req, res) => {
    stores.push(req.body);
    responseStores(res);
});
function responseStores(res) {
    res.set({ 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(stores));
}


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

            });

    });

});

const connection = mysql.createConnection({
    host: sqlConfig['development']['database']['host'],
    user: sqlConfig['development']['database']['user'],
    password: sqlConfig['development']['database']['password'],
    port: sqlConfig['development']['database']['port'],
    database: sqlConfig['development']['database']['database'],
});
connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');

        console.error(err);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

