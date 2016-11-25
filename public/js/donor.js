//Grabs the URL including port # from the browser
var host = window.location.host;
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitDonorName").on('click', function (event) {
		var userId = $('#getDonator').find('#donor-name option:selected').val();
		console.log('User ID = ' + userId);
		$.get(serverURL + 'donator-dashboard?donor_id='+userId);
	});
});