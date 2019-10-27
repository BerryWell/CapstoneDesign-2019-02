// an API for Android

const { app } = require('./app');
const { queryAsync } = require('./connection');

let users = [
  {
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'bek'
  },
  {
    id: 3,
    name: 'chris'
  }
]

app.get('/test', (req, res) => {
  res.write("Hello world!");
  res.end();
});

app.get('/categories', (req, res) => {
  res.write();
});



app.get('/users', (req, res) => {
   console.log('who get in here/users');
   res.json(users)
});

app.post('/post', (req, res) => {
   console.log('who get in here post /users');
   var inputData;

   req.on('data', (data) => {
     inputData = JSON.parse(data);
   });

   req.on('end', () => {
     console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
   });

   res.write("OK!");
   res.end();
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

