var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'root',
  password: 'default',
  database: 'projectbgroup12'
});

exports.getDonors = function() { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `donor`", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      resolve(results);
    });
  });
};

//Returns data specifc to a certain donor
exports.getDonor = function(id) { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `donor` WHERE donor_id ="+id+"", function(err, results, fields) {
      if (err) {
        console.log("error displaying donor table");;
        return;
      }
      resolve(results);
    });
  });
};

exports.getCharities = function() { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `charity`", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      resolve(results);
    });
  });
};

exports.getCharity = function(id) { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `charity` WHERE charity_id ="+id+"", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      resolve(results);
    });
  });
};

exports.getSponsors = function() { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `sponsor`", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      resolve(results);
    });
  });
};

exports.getSponsor = function(id) { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `sponsor` WHERE sponsor_id ="+id+"", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      resolve(results);
    });
  });
};

exports.getSponsorships = function(id) { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `sponsorships` INNER JOIN `charity` ON sponsorships.charity_id=charity.charity_id WHERE sponsor_id="+id+"", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      resolve(results);
    });
  });
};


