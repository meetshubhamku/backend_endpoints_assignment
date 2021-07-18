var mysql = require("mysql");
var dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

dbConnection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  } else {
    console.warn("Database connection successfull");
  }
});

module.exports = dbConnection;
