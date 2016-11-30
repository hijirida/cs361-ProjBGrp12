var express = require('express');
var db = require('./dbqueries.js');
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

app.set('port', process.env.PORT || 3002);

app.use(express.static(__dirname + '/public'));
//app.use(session({secret:'SuperSecretPassword', resave: false, saveUninitialized: true}));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//Renders landing page for app
app.get('/', function(req, res){
  res.render('landing.hbs');
});



//Renders login / sign-up pages for user types
app.get('/donor', function(req, res) {
  context = {};
  db.getDonors().then(function (donors) {
    context.donors = donors;
    res.render('donor.hbs', context);
  });
});

app.get('/charity', function(req, res) {
  context = {};
  db.getCharities().then(function (charities) {
    context.charities = charities;
    res.render('charity.hbs', context);
  });
});

app.get('/sponsor', function(req, res) {
  context = {};
  db.getSponsors().then(function (sponsors) {
    context.sponsors = sponsors;
    res.render('sponsor.hbs', context);
  });
});



//Renders pages to set up new accounts
app.get('/donorsetup', function(req, res) {
  context = {};
  console.log ("Successfully got to donorsetup");
  pool.query("SELECT * FROM `donor`", function(err, rows, fields) {
    if (err) {
      console.log("error displaying data from donor table");
      return;
    }
    context.results = rows;
    //console.log(context);
    res.render('donorsetup.hbs', context);
  });
});


app.get('/addDonor', function (req, res, next) {
  context = {};
  foundDuplicate = false;
  console.log ("Successfully got to addDonor");
  
  // check for duplicate username first
  if (req.query.username !== undefined) {
    querystring = "SELECT `username` FROM `donor` WHERE `username` = '" + req.query.username + "'";
    //console.log(querystring);
    pool.query (querystring, 
       function(err, rows, fields, foundDuplicate) {
          if (err) {
             console.log("error checking for donor duplicates");
             return;
         }
         console.log ("rows = ", rows);
	 if (rows == undefined || rows == null || rows.length <=0) {
            foundDuplicate = false;
         } else {
            foundDuplicate = true;
         }
         //console.log ("found duplicate1 = ", foundDuplicate);
  
         if (foundDuplicate == false) {
            if (req.query.username !== undefined) {
               console.log("req.query.username1 = ", req.query.username);
               pool.query("INSERT INTO `donor`(`username`, `password`, `first_name`, `last_name`, `short_description`) VALUES(?,?,?,?,?)",
               [req.query.username, req.query.password, req.query.first_name, req.query.last_name, req.query.short_description],
               function(err, results) {
                 if (err) {
                   console.log("error inserting donor table");
                   return;
                 }
               });    
            }
         } 
       }
    );
  }

  // Note: I played with adding a delay because the table below rendered before new donor was added
  // Next improvement: Show a different view or msg if a duplicate username "sorry, there is a duplicate username"
  setTimeout(function() {
    pool.query("SELECT * FROM `donor`", function(err, rows, fields) {
     if (err) {
      console.log("error displaying data from donor table");
      return;
     }
     context.results = rows;
     res.render('addDonor.hbs', context);
    });
  }, 500);

});


app.get('/add-charity', function(req, res) {
  var context = {};

  if (req.query.name !== undefined) {
      pool.query("INSERT INTO `charity`(`charity_name`, `charity_website`, `charity_description`) VALUES(?,?,?)",
      [req.query.name, req.query.website, req.query.charityDescription],  function(err, results) {
        if (err) {
          console.log("error inserting charity table");
          return;
        }
        console.log(results);
      });
    }; 

  db.getCharities().then(function(charities) {
    context.results = charities;
    res.render('addCharity.hbs', context);
  });
});

app.get('/add-sponsor', function(req, res) {
  var context = {};

  if (req.query.name !== undefined) {
      pool.query("INSERT INTO `sponsor`(`sponsor_name`) VALUES(?)",
      [req.query.name],  function(err, results) {
        if (err) {
          console.log("error inserting charity table");
          return;
        }
        console.log(results);
      });
    }; 

  db.getSponsors().then(function(sponsors) {
    context.sponsors = sponsors;
    res.render('addSponsor.hbs', context);
  });
});



//Renders dashboards
app.get('/donator-dashboard', function(req, res) {
  context = {};
  console.log("Incoming user is " + req.query.donor_id);

  //Adds donation amounts and associated charity to the donations table
  if (req.query.sponsorship_id !== undefined) {
    pool.query("INSERT INTO `donor_sponsor`(`donor_id`, `sponsorship_id`) VALUES (?,?)",
      [req.query.donor_id, req.query.sponsorship_id], function(err, results) {
        if (err) {
          console.log("error inserting into donations table");
          return;
        }
      });
  };

  db.getDonor(req.query.donor_id).then(function (donor) {
    db.getAvailableSponsorships().then(function(sponsorships) {
      db.getSponsorshipsByDonor(req.query.donor_id).then(function (donorSponsoring) {
        context.donor = donor[0];
        context.sponsorships = sponsorships;
        context.donorSponsoring = donorSponsoring[0];
        console.log('donor sponsoring ' + donorSponsoring)
        console.log(sponsorships);
        res.render('donatorDashboard', context);
      });
    });
  });
});

app.get('/charity-dashboard', function(req, res) {
  context = {};
  console.log("Incoming user is " + req.query.charity_id);

  db.getCharity(req.query.charity_id).then(function (charity) {
      context.charity = charity[0];
      console.log(charity);
      res.render('charityDashboard.hbs', context);
  });
});

app.get('/sponsor-dashboard', function(req, res) {
  context = {};
  console.log("Incoming user is " + req.query.sponsor_id);

  //Adds donation amounts and associated charity to the donations table
  if (req.query.amount !== undefined) {
    pool.query("INSERT INTO `sponsorships`(`donation_amount`, `sponsorship`, `charity_id`, `sponsor_id`) VALUES (?,?,?,?)",
      [req.query.amount, req.query.steps, req.query.charity_id, req.query.sponsor_id], function(err, results) {
        if (err) {
          console.log("error inserting into donations table");
          return;
        }
      });
  };

  db.getSponsor(req.query.sponsor_id).then(function (sponsor) {
    db.getCharitiesWithoutSponsors().then(function (charities) {
      db.getSponsorshipsBySponsor(req.query.sponsor_id).then(function (sponsorships) {
          context.sponsorships = sponsorships;      
          context.sponsor = sponsor[0];
          context.charities = charities;
          console.log(sponsor);
          res.render('sponsorDashboard.hbs', context);
      });
    });
  });
});

// Renders a success message for adding new steps 
// This is called from /donator-dashboard
// Improvement idea: check to see if new steps takes progress past the goal!
app.get('/donator-addsteps', function(req, res) {
  context = {};
  console.log ("Successfully got to donator-addsteps");

  // show the number of steps passed
  //console.log ("new_donor_steps = ", req.query.new_donor_steps);

  // show the donor id
  //console.log ("donor_id = ", req.query.donor_id);

  db.getDonor(req.query.donor_id).then(function (donor) {
    //console.log("donor = ", donor);
    context.donor = donor[0];
  });

  // get lifteime steps
  db.getLifetimeSteps(req.query.donor_id).then(function (result) {
    context.donorid = parseInt(req.query.donor_id); // force text to integer
    context.lifetime_steps = result[0].lifetime_steps;
    context.new_donor_steps = parseInt(req.query.new_donor_steps); // force text to integer
    context.new_lifetime_steps = context.lifetime_steps + context.new_donor_steps;
    //console.log ("*** context = ", context);
    
    // get charity id, cursteps, and progress given donor id
    db.getSponsorshipsByDonor (parseInt(req.query.donor_id)).then (function(sponsorship) {
      console.log ("sponsorship = ", sponsorship); 
      context.charityid = sponsorship[0].charity_id;
      context.cursteps = sponsorship[0].cur_steps;
      context.newcursteps = context.cursteps + context.new_donor_steps;
      context.progress = sponsorship[0].progress;
      context.newprogress = context.newcursteps / sponsorship[0].sponsorship * 100;
      console.log ("**** context = ", context);
   
      // get charity name given charity id
      db.getCharity (context.charityid).then (function(charity) {
        console.log("charityname = ", charity);
        context.charity_name = charity[0].charity_name;
      });
   
      // update lifetime steps donor table
      db.updateLifetimeSteps(context.donorid, context.new_lifetime_steps).then (function (add_lifetime_steps) {
         //console.log ("addstepresult = ", add_lifetime_steps);

         // update cur_steps in sponsorhips table
         db.updateSponsorshipsSteps(context.charityid, context.newcursteps).then (function (add_cur_steps) {
           console.log ("add_cur_steps = ", add_cur_steps);
         });

         // update progress in sponsorships table
         db.updateProgress(context.charityid, context.newprogress). then (function (add_progress) {
	           console.log ("add_progress = ", add_progress);
           res.render('addDonorSteps.hbs', context); 
         });
      });
   });
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

