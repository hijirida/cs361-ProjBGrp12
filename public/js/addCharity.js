//Grabs the URL including port # from the browser
var host = window.location.host;
console.log ("host = ", host);
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
  $("#submitCharity").on('click', function (event) {
    event.preventDefault();
    var name = $('#newCharity').find('#name').val();
    console.log(name);
    var website = $('#newCharity').find('#website').val();
    console.log(website);
    var description = $('#newCharity').find('#charityDescription').val();
    console.log(description);
    $.get(serverURL + 'add-charity?name='+name+'&website='+website+'&charityDescription='+description)
      .done(window.location = serverURL + 'add-charity');
  });
});



