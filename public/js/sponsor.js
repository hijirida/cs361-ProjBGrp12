//Grabs the URL including port # from the browser
var host = window.location.host;
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitSponsorName").on('click', function (event) {
		var sponsorId = $('#getSponsor').find('#sponsor-name option:selected').val();
		console.log('Sponsor ID = ' + sponsorId);
		$.get(serverURL + 'sponsor-dashboard?sponsor_id='+sponsorId);
			//.done(serverURL + 'sponsor-dashboard?sponsor_id='+sponsorId);
	});
});