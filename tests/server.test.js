const expect = require('expect');
const request = require('supertest');

const app = require('./../server');

var text = "This is the text";

it('should have the right text', function () {
	expect('This is the text').toBe(text);
});

describe('GET /exerciser', function() {
	it('should connect to the app', function (done) {
		request(app.app)
			.get('/exerciser')
			.expect(200);
		done();
	});
});