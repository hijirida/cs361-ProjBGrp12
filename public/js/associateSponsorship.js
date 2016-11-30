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

// This listens for donor adding steps form submission 
$(document).ready(function () {
	$("#submitAddSteps").on('click', function (event) {
		event.preventDefault();
		var donor_id = $('#addSteps').find('input[name="donor_id"]').val();
		//console.log("** donor_id = ", donor_id);
      	var new_donor_steps = $('#addSteps').find('input[name="new_donor_steps"]').val(); 
      	if (new_donor_steps <= 0) {
     		alert('Warning: Number of steps must be > 0');
      	} else {
			//$.get(serverURL + 'donator-addsteps?donor_id='+donor_id+'&new_donor_steps='+new_donor_steps) // this was not working??)
			$.get().done(window.location = serverURL + 'donator-addsteps?donor_id='+donor_id+'&new_donor_steps='+new_donor_steps);
		}
	});
});
