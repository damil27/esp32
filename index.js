const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

// mysql  connection

const pool = mysql.createPool({
  connectionLimit: 10,

  host: "208.91.199.159",
  user: "providen_Ik",
  password: "u7brAkxs%&,g",
  database: "providen_esp_data_acquisition",

  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "esp_data_acquisition",
});
// get request from database
app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(" SELECT * FROM data_linking", (err, rows) => {
      connection.release();
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});
app.listen(port, () => console.log(`app listening on port ${port}`));
