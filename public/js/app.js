//serverURL = 'http://52.27.76.189:3001/';
// Use this code instead to grab the URL including port # from the browser
var host = window.location.host;
console.log ("host = ", host);
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitUserType").on('click', function (event) {
		var userType = $('#userType').find('input[name="select-type"]:checked', '#userType').val();
		console.log(userType);
		$.get(serverURL + userType)
			.done(window.location = serverURL + userType);
	});
});
