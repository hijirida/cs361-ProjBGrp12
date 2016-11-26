//Grabs the URL including port # from the browser
var host = window.location.host;
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitCharityName").on('click', function (event) {
		var charityId = $('#getCharity').find('#charity-name option:selected').val();
		console.log('Charity ID = ' + charityId);
		$.get(serverURL + 'charity-dashboard?charity_id='+charityId);
	});
});