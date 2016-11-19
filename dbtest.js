var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'root',
  password: 'default',
  database: 'projectbgroup12'
});

exports.dbtest = function(){ return new Promise(function(resolve, reject){
  var outString = 'No Results';
  pool.getConnection(function(err,con){
    if(err){
      console.error('Something has gone wrong. Hopefully this error stack has something useful in it:\n' + err.stack);
      reject('DB Connection Error');
    };
    con.query('SELECT * FROM donor', function( error, results, fields){
      if(error){
        console.error('An issue happened after connecting to the database. Hopefully this stack trace yields something of interest:\n' + error.stack);
        con.release();
        reject('Query error: ' + error);
      };
      outString = 'MySQL says ' + results[0].username;
      resolve(outString);
    });
    con.release();
  });
});};
