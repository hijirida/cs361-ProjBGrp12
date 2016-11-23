var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'root',
  password: 'default',
  database: 'projectbgroup12'
});

exports.getDonations = function() { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `charity` INNER JOIN `donations` ON charity.charity_id = donations.charity_id", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      var query_results = results;
      resolve(query_results);
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
      var query_results = results;
      resolve(query_results);
    });
  });
};
