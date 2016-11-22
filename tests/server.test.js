const expect = require('expect');
const request = require('supertest');

const app = require('./../server');

//describe lets you group tests together
//'it' is the call for individual tests

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
