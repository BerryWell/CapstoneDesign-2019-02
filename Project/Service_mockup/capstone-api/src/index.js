const { app, port } = require('./app');
const { connection } = require('./connection');

require('./store');
require('./signup');

app.get('/', (req, res) => res.send('Hello World!'));

connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
