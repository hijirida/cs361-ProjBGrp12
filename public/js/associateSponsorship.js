//Grabs the URL including port # from the browser
var host = window.location.host;
console.log ("host = ", host);
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitSponsorshipChoice").on('click', function (event) {
		event.preventDefault();
		var sponsorshipId = $('#sponsorshipChoice').find('input[name="select-sponsorship"]:checked', '#sponsorshipChoice').val();
		console.log(sponsorshipId);
		var donor_id = $('#sponsorshipChoice').find('input[name="donor_id"]').val();
		console.log(donor_id);
		$.get(serverURL + 'donator-dashboard?sponsorship_id='+sponsorshipId+'&donor_id='+donor_id)
		 	.done(window.location = serverURL + 'donator-dashboard?donor_id=' + donor_id);
	});
});