const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const db = require('./server');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//import our get push functions from server.js
app.get('/students', db.getStudents);
app.post('/students', db.createStudent);

//get request
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});


//
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

