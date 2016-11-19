serverURL = 'http://52.27.76.189:3001/';

$(document).ready(function () {
	$("#submitUserType").on('click', function (event) {
		var userType = $('#userType').find('input[name="select-type"]:checked', '#userType').val();
		console.log(userType);
		$.get(serverURL + userType)
			.done(window.location = serverURL + userType);
	});
});