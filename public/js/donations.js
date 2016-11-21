//Grabs the URL including port # from the browser
var host = window.location.host;
console.log ("host = ", host);
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitCharityDonation").on('click', function (event) {
		event.preventDefault();
		var name = $('#charityDonation').find('#charity-name option:selected').val();
		console.log(name);
		var amount = $('#charityDonation').find('input[name="amount"]').val();
		console.log(amount);
		$.get(serverURL + 'donation?name='+name+'&amount='+amount);
	});
});