const { promisify } = require('util');
const mysql = require('mysql');
const sqlConfig = require('./config');

const connection = mysql.createConnection({
    host: sqlConfig['development']['database']['host'],
    user: sqlConfig['development']['database']['user'],
    password: sqlConfig['development']['database']['password'],
    port: sqlConfig['development']['database']['port'],
    database: sqlConfig['development']['database']['database'],
});

exports.connection = connection;
exports.queryAsync = promisify(connection.query.bind(connection));
