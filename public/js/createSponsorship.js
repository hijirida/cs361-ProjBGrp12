//Grabs the URL including port # from the browser
var host = window.location.host;
console.log ("host = ", host);
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitSponsorship").on('click', function (event) {
		event.preventDefault();
		var id = $('#createSponsorship').find('#charity-name option:selected').val();
		console.log(id);
		var amount = $('#createSponsorship').find('input[name="amount"]').val();
		console.log(amount);
		var sponsorId = $('#createSponsorship').find('input[name="sponsor_id"]').val();
		console.log('Sponsor id = ' + sponsorId);
		$.get(serverURL + 'sponsor-dashboard?sponsor_id='+sponsorId+'&charity_id='+id+'&amount='+amount)
			.done(window.location = serverURL + 'sponsor-dashboard?sponsor_id=' + sponsorId);
	});
});