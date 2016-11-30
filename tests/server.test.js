const expect = require('expect');
const request = require('supertest');

const app = require('./../server');
const queries = require('./../dbqueries');

//describe lets you group tests together
//'it' is the call for individual tests

describe('Server Tests' , function () {
	describe('Test individual routes', function() {
		it('should give a 200 status "/"', function(done) {
			request(app.app)
				.get('/')
				.expect(200, done);
		});
		it('should give a 200 status "/donor"', function(done) {
			request(app.app)
				.get('/donor')
				.expect(200, done);
		});
		it('should give a 200 status "/sponsor"', function(done) {
			request(app.app)
				.get('/sponsor')
				.expect(200, done);
		});
		it('should give a 200 status "/donorsetup"', function(done) {
			request(app.app)
				.get('/donorsetup')
				.expect(200, done);
		});
		it('should give a 200 status "/add-charity"', function(done) {
			request(app.app)
				.get('/add-charity')
				.expect(200, done);
		});
		it('should give a 200 status "/add-sponsor"', function(done) {
			request(app.app)
				.get('/')
				.expect(200, done);
		});
		it('should give a 200 status "/donator-dashboard"', function(done) {
			request(app.app)
				.get('/donator-dashboard?donor_id=1')
				.expect(200, done);
		});
		it('should give a 200 status "/charity-dashboard"', function(done) {
			request(app.app)
				.get('/charity-dashboard?charity_id=1')
				.expect(200, done);
		});
		it('should give a 200 status "/sponsor-dashboard"', function(done) {
			request(app.app)
				.get('/sponsor-dashboard?sponsor_id=1')
				.expect(200, done);
		});
		it('is a bad route, should give a 404', function(done) {
			request(app.app)
				.get('/badRoute')
				.expect(404, done);
		});
	});
});

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

/* Tests adding charity to charity database with GET method from /organization route */


// describe('General Database Tests' , function () {
// 	it('should insert charity into charity database', function(done) {
// 		request(app.app)
// 			.get('/organization?name=testName&website=testWebsite&charityDescription=testDescription')
// 		.end(function(err, res) {
// 			if (err) {
// 				return done(err);
// 			}
// 		  pool.query("SELECT * FROM `charity`", function(err, rows, fields) {
// 		    if (err) {
// 		      console.log("error display charity table");;
// 		      return;
// 		    }
// 		    expect(rows).toHave('testName');
// 		    done();
// 			});
// 		});
// 	});
// });


describe('Database Manipulation Tests' , function () {
	it('should correctly add steps', function(done) {
		queries.getLifetimeSteps(1).then(function(steps){						// query for donor
			queries.getSponsorshipsByDonor(1).then(function(sponsorship) {		//query for sponsorship
				request(app.app)		
					.get('/donator-addsteps?donor_id=1&new_donor_steps=15')
					.then(function () {
						queries.getLifetimeSteps(1).then(function(updatedSteps) {
							queries.getSponsorshipsByDonor(1).then(function(updatedSponsorship) {
								//Assertions
								expect(updatedSteps[0].lifetime_steps).toEqual(15 + steps[0].lifetime_steps);						
								expect(updatedSponsorship[0].cur_steps).toEqual(15 + sponsorship[0].cur_steps);
								expect(updatedSponsorship[0].progress).toEqual(updatedSponsorship[0].cur_steps / sponsorship[0].sponsorship * 100);
								done();
						});
					});	
				});
			});
		});
	});
});





