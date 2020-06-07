var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_hoanger",
  password: "Ironman1",
  database : 'cs340_hoanger'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;
