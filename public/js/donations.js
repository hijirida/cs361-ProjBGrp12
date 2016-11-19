serverURL = 'http://52.27.76.189:3001/';

$(document).ready(function () {
	$("#submitCharityDonation").on('click', function (event) {
		var data = $('#userType').find('input[name="select-type"]:checked', '#userType').val();
		console.log(userType);
		$.get(serverURL + '/donation?name='+name+'&amount='+amount)
			.done(window.location = serverURL + '/donation');
	});
});