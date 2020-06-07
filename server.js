var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');


var app = express();



//Connect to Database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_hoanger",
  password: "Ironman1",
  database : 'cs340_hoanger',
  dateStrings: 'date'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
//

const PORT = process.env.PORT || 3000;
//session

app.use(cookieParser('secret'))

app.set('trust proxy', 1);

// app.use(session({
//   secret: "secret"
// }));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
  cookie: {
    secure: app.get('env') === 'production'
  }
}));

console.log("== Port:", PORT);

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

var auth = function(req, res, next) {
  if (req.session.username && req.session.loggedin)
    return next();
  else
  // console.log(req.session.username);
  // console.log(req.session.loggedin);
    return res.render('unauthorized');
};

var redirect404 = function ( req, res, next) {
  if (req.session.loggedin)
    return next();
  else
    return res.render('404');
}

app.get('/', function (req, res, next) {
  res.render('/views/index');
});

app.get('/home/', function (req, res, next) {
  res.render('index');
});

app.get('/info/', function (req, res, next) {
  res.render('info');
});

app.get('/news/', function (req, res, next) {
  res.render('news');
});

app.get('/friend/', auth, function (req, res, next) {
  var sql = "SELECT * FROM Friend WHERE (SELECT ID FROM Member WHERE Username = '" + req.session.username + "') ";
  connection.query(sql, function( err, result, fields) {
    if (result.length > 0) {
      console.log('in');
    res.render('friend', {
      data: result
      });
    } else {
      console.log('out');
      res.render('friend');
    }
    });
  });

app.get('/login', redirect404, function (req, res, next) {
  res.render('signup');
});

app.get('/Profile/', function (req, res, next) {
  // console.log('Before SQL');
  // console.log(req.session);
  // console.log(req.session.username);
  var query = "SELECT * FROM `Member` INNER JOIN Log ON Log.User_ID = Member.ID WHERE Member.Username = '" + req.session.username + "' ";
  connection.query(query, function( log_err, log_res, log_fields) {
    if (log_res.length > 0) {
      res.render('user', {
        log: true,
        logdata: log_res
      });
    } else {
      var sql = "SELECT * FROM Member WHERE Username = '" + req.session.username + "' ";
      connection.query(sql, function( err, result, fields) {
        if (result.length > 0) {
        res.render('user',{
          logdata: result
        });
        } else {
          res.render('signup');
        }
      });
    };
   });
 });
//     var sql = "SELECT * FROM Member WHERE Username = '" + req.session.username + "' ";
//     connection.query(sql, function( err, result, fields) {
//       // if (result.length > 0) {
//       //   res.render('user', {
//       //     data: result,
//       //     loggedin: true
//       //   });
//       // } else {
//       //   res.render('signup');
//       // }
//     });
// });

app.get('/user/', redirect404, function (req, res, next) {
    res.render('user');
});

app.post('/addLog', redirect404, function (req, res, next) {
  var mysql = req.app.get('mysql');
  var newDesc = req.body.logDesc;
  var sql = "SELECT ID FROM Member WHERE Username = '" + req.session.username + "' ";
  connection.query(sql, function( err, result, fields) {
    var newID = result[0].ID;
    console.log(newID);
    var sql = "INSERT INTO `Log`( `Description`, `User_ID`) VALUES ('" + newDesc + "', '" + newID + "' )";
    connection.query(sql, function( log_err, log_res, log_fields) {
    });
  });
  res.render('log');
});

app.get('/tips/', function (req, res, next) {
  res.render('tips');
});

app.get('/success/', redirect404, function (req, res, next) {
  res.render('success');
});

app.post('/signup', function (req, res) {
  var mysql = req.app.get('mysql');
  var newUsername = req.body.rname;
  var newPassword = req.body.rpass;
  var newFirst = req.body.rfirstN;
  var newLast = req.body.lname;
  var newEmail = req.body.remail;
  var sql = "INSERT INTO Member VALUES (null, '" + newUsername + "', '" + newFirst + "', '" + newLast + "', '" + newPassword + "', '" + newEmail + "')";
  connection.query(sql, function (err, res) {
      if (err)
      {
        throw err;
      }
    });
    return res.redirect('/success');
    });

app.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
    var sql = "SELECT * FROM Member WHERE username = '" + username + "' AND password =  '" + password + "' ";
		connection.query(sql, function(err, response, fields) {
			if (response.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
        // console.log('in');
        // console.log(req.session.username);
        // console.log(req.session.loggedin);
        req.session.save(function(err) {
          if (err) {
            throw err;
          }
        })
        return req.session;
			} else {
				return err;
			}
    });
    return res.render('success', {
      loggedin: true
    }) ;
  });

app.get('/logout', redirect404, function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.render('logout');
      }
    });
  }
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(PORT, function () {
    console.log("== Server is listening on port:", PORT);
});
