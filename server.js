var express = require('express');
var db = require('./dbtest.js');
var session = require('express-session');
var hbs = require('hbs');
var fs = require('fs');

var app = express();
app.set('port', process.env.PORT || 3001);

app.use(express.static(__dirname + '/public'));
app.use(session({secret:'SuperSecretPassword', resave: false, saveUninitialized: true}));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.set('view engine', 'hbs');


app.get('/home', function(req, res){
  context = {}
	var sess = req.session;
	var views = req.session.views || 0;
  context.greeting = 'HELLO PROJECT B GROUP 12!!! Woooohoo!\n';
	context.message = 'You have visited this page ' + views + ' times before. If this increments on refresh, sessions are working.\n';
	req.session.views = views + 1;
  db.dbtest().then(function createResposne(val){
    context.dbResponse = val;
    res.render('home.hbs', context);
  });
});

app.get('/exerciser', function(req, res) {
  var filename = 'data/charities.txt';

  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
    } else {
      console.log("Success reading file: ", filename);
      console.log(JSON.parse(data));
      res.render('exerciser.hbs', JSON.parse(data));
    }
  });
});

app.get('/donation', function(req, res) {
  res.render('donation.hbs');
});

app.get('/organization', function(req, res) {
  res.render('organization.hbs');
});


app.use(function(req, res, next){
  res.type('text/plain');
  res.status(404);
  res.send('404 - There is nothing here save for vast expanses of nothing');
});

app.listen(app.get('port'), function(){
        console.log( 'Express started on http://52.27.76.189:' + app.get('port') + ' press Ctrl-C to exit');
});



