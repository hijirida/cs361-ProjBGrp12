serverURL = 'http://52.27.76.189:3001/';

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