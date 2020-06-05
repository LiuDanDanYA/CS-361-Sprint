var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser');

var app = express();

const PORT = process.env.PORT || 3000;
console.log("== Port:", PORT);

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.status(200).render('index');
});

app.get('/home/', function (req, res, next) {
  res.status(200).render('index');
});

app.get('/info/', function (req, res, next) {
  res.status(200).render('info');
});

app.get('/news/', function (req, res, next) {
  res.status(200).render('news');
});

app.get('/friend/', function (req, res, next) {
  res.status(200).render('friend');
});

app.get('/profile/', function (req, res, next) {
  res.status(200).render('Profile');
});

app.get('/tips/', function (req, res, next) {
  res.status(200).render('tips');
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(PORT, function () {
    console.log("== Server is listening on port:", PORT);
});
