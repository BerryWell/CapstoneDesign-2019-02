const sqlConfig = require('./config');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: sqlConfig['development']['database']['host'],
    user: sqlConfig['development']['database']['user'],
    password: sqlConfig['development']['database']['password'],
    port: sqlConfig['development']['database']['port'],
    database: sqlConfig['development']['database']['database'],
});

module.exports = connection;
