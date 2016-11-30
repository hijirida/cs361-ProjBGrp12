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

exports.getCharitiesWithoutSponsors = function() { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `charity` WHERE `charity_id` NOT IN (SELECT `charity_id` FROM `sponsorships`)", function(err, results, fields) {
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

exports.getSponsorshipsBySponsor = function(id) { 
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

exports.getAvailableSponsorships = function(id) { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `sponsorships` INNER JOIN `charity` ON sponsorships.charity_id=charity.charity_id", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      resolve(results);
    });
  });
};

exports.getSponsorshipsByDonor = function(id) { 
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM `donor_sponsor` INNER JOIN `sponsorships` ON donor_sponsor.sponsorship_id=sponsorships.charity_id INNER JOIN `charity` ON sponsorships.charity_id = charity.charity_id WHERE donor_sponsor.donor_id="+id+"", function(err, results, fields) {
      if (err) {
        console.log("error display charity table");;
        return;
      }
      resolve(results);
    });
  });
};


exports.getLifetimeSteps = function(id) {
  return new Promise (function(resolve, reject) {
    pool.query("SELECT `lifetime_steps` FROM `donor` WHERE donor_id="+id+"", function (err, results, fields) {
      if (err) {
        console.log("error displaying get Lifetime Steps");
        return;
      }
      resolve (results);
    });
  }); 
};

exports.updateLifetimeSteps = function(id, steps) {
  return new Promise (function(resolve, reject) {
    pool.query("UPDATE `donor` SET `lifetime_steps` ="+steps+" WHERE donor_id="+id+"", function(err, results, fields) {
      if (err) {
        console.log("error updating lifetime_steps");;
        return;
      }
      resolve(results);
    });
  });
};

exports.updateSponsorshipsSteps = function (id, steps) {
  return new Promise (function(resolve, reject) {
    pool.query("UPDATE `sponsorships` SET `cur_steps` = "+steps+" WHERE charity_id="+id+"", function(err, results, fields) {
      if (err) {
        console.log ("error updating cur_steps in sponsorship table");
        return;
      }
      resolve(results);
    });
  });
};

exports.updateProgress = function (id, new_progress) {
  return new Promise (function(resolve, reject) {
    pool.query("UPDATE `sponsorships` SET `progress` = "+new_progress+" WHERE charity_id="+id+"", function(err, results, fields) {
      if (err) {
        console.log ("error updating progress in sponsorship table");
        return;
      }
      resolve(results);
    });
  });
};


