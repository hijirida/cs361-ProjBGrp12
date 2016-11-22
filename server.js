var express = require('express');
var db = require('./dbtest.js');
var session = require('express-session');
var hbs = require('hbs');
var fs = require('fs');
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'root',
  password: 'default',
  database: 'projectbgroup12'
});

var app = express();

app.set('port', process.env.PORT || 3001);

app.use(express.static(__dirname + '/public'));
app.use(session({secret:'SuperSecretPassword', resave: false, saveUninitialized: true}));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.set('view engine', 'hbs');


app.get('/', function(req, res){
  context = {}
  context.portNum = app.get('port');
  //var sess = req.session;
  //var views = req.session.views || 0;
  //context.greeting = 'HELLO PROJECT B GROUP 12!!! Woooohoo!\n';
  //context.message = 'You have visited this page ' + views + ' times before. If this increments on refresh, sessions are working.\n';
  //req.session.views = views + 1;
  db.dbtest().then(function createResposne(val){
    context.dbResponse = val;
    res.render('home.hbs', context);
  });
});

app.get('/donorsetup', function(req, res) {
  // add code here for donorsetup
  //console.log ("Successfully got to donorsetup");
  res.render('donorsetup.hbs');
});

app.get('/addDonor', function (req, res) {
  // TODO: David to add code here for pushing donor data to databsae
  console.log ("Successfully got to addDonor");
  res.render('addDonor.hbs');
});

app.get('/exerciser', function(req, res) {
  context = {};
  context.portNum = app.get('port');

  //updated to be reading from database
  pool.query("SELECT * FROM `charity`", function(err, rows, fields) {
    if (err) {
      console.log("error display charity table");;
      return;
    }
    context.results = rows;
    res.render('exerciser.hbs', context);
  });
});

app.get('/donation', function(req, res) {
  context = {};
  context.portNum = app.get('port');
  
  //update this to add to database
  console.log('Data coming from client = ' + req.query.name);

  //updated to be reading from database
  pool.query("SELECT * FROM `charity`", function(err, rows, fields) {
    if (err) {
      console.log("error display charity table");;
      return;
    }
    context.results = rows;
    res.render('donation.hbs', context);
  });
});


app.get('/organization', function(req, res) {
  var context = {};

  if (req.query.name !== undefined) {
      pool.query("INSERT INTO `charity`(`charity_name`, `charity_website`, `charity_description`) VALUES(?,?,?)",
      [req.query.name, req.query.website, req.query.charityDescription],  function(err, results) {
        if (err) {
          console.log("error inserting charity table");
          return;
        }
      });
    }; 

  pool.query("SELECT * FROM `charity`", function(err, rows, fields) {
    if (err) {
      console.log("error display charity table");;
      return;
    }
    context.results = rows;
    console.log(context.results);
    res.render('organization.hbs', context);
  });
});


app.use(function(req, res, next){
  res.type('text/plain');
  res.status(404);
  res.send('404 - There is nothing here save for vast expanses of nothing');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://52.27.76.189:' + app.get('port') + ' press Ctrl-C to exit');
});


module.exports = {app: app};

// test
