var mysql = require('mysql');

var con = mysql.createConnection({
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_hoanger",
  password: "Ironman1",
  database : 'cs340_hoanger'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
