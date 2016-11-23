//Grabs the URL including port # from the browser
var host = window.location.host;
console.log ("host = ", host);
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitCharityDonation").on('click', function (event) {
		event.preventDefault();
		var id = $('#charityDonation').find('#charity-name option:selected').val();
		console.log(id);
		var amount = $('#charityDonation').find('input[name="amount"]').val();
		console.log(amount);
		$.get(serverURL + 'donation?charity_id='+id+'&amount='+amount);
	});
});