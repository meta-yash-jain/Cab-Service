const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "cab_service"
});

conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

app.get('/api/bookings', (req, res) => {
  const sql = "SELECT * FROM user_bookings";
  const query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send({ "status": 200, "error": null, "response": results });
  });
});

app.get('/api/nearBy', (req, res) => {
  const data = {
    location: req.query.location
  };

  const sql = `SELECT ci.* FROM distance_mapping dm 
  JOIN cab_info ci on ci.current_location=dm.locationB 
  WHERE locationA='${data.location}' and distance < 20`;
  const query = conn.query(sql, data, (err, results) => {
    if (err) throw err;

    res.send({ "status": 200, "error": null, "response": results });
  })
});

app.post('/api/toBook', (req, res) => {
  console.log(req)
  const data = {
    source: req.body.source,
    destination: req.body.destination,
    noOfPerson: req.body.noOfPerson,
    fare: req.body.noOfPerson * 100
  };

  console.log('pass')

  const sql = "INSERT INTO user_bookings SET ?";
  const query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send({ "status": 200, "error": null, "response": results });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
