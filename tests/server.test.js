const expect = require('expect');
const request = require('supertest');

const app = require('./../server');

//describe lets you group tests together
//'it' is the call for individual tests

//Tests database connection. Test fails if credentials are changed
describe('Access the DB', function(){
    it('should successfully connect to the database', function(done){
        var test_pool = mysql.createPool({
		  host  : 'localhost',
		  user  : 'root',
		  password: 'default',
		  database: 'projectbgroup12'
		});
        test_pool.getConnection(done);
    });
});

//DB credentials for future tests
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'root',
  password: 'default',
  database: 'projectbgroup12'
});


describe('Server Tests' , function () {
	describe('Test individual routes', function() {
		it('should give a 200 status "/"', function(done) {
			request(app.app)
				.get('/')
				.expect(200, done);
		});
		it('should give a 200 status "/donorsetup"', function(done) {
			request(app.app)
				.get('/donorsetup')
				.expect(200, done);
		});
		it('should give a 200 status "/addDonor"', function(done) {
			request(app.app)
				.get('/addDonor')
				.expect(200, done);
		});
		it('should give a 200 status "/exerciser"', function(done) {
			request(app.app)
				.get('/exerciser')
				.expect(200, done);
		});
		it('should give a 200 status "/donation"', function(done) {
			request(app.app)
				.get('/donation')
				.expect(200, done);
		});
		it('should give a 200 status "/organization"', function(done) {
			request(app.app)
				.get('/organization')
				.expect(200, done);
		});
		it('is a bad route, should give a 404', function(done) {
			request(app.app)
				.get('/badRoute')
				.expect(404, done);
		});
	});
});


/* Tests adding charity to charity database with GET method from /organization route */
/* Commented out to not add to the database every time the script is run

describe('Database tests' , function () {
	it('should insert charity into charity database', function(done) {
		request(app.app)
			.get('/organization?name=testName&website=testWebsite&charityDescription=testDescription')
		.end(function(err, res) {
			if (err) {
				return done(err);
			}
		  pool.query("SELECT * FROM `charity`", function(err, rows, fields) {
		    if (err) {
		      console.log("error display charity table");;
		      return;
		    }
		    expect(rows).toHave('testName');
		    done();
			});
		});
	});
});

*/
