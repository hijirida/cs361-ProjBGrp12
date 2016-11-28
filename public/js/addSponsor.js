//Grabs the URL including port # from the browser
var host = window.location.host;
console.log ("host = ", host);
var serverURL = "http://" + host + "/"; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
  $("#submitSponsor").on('click', function (event) {
    event.preventDefault();
    var name = $('#newSponsor').find('#name').val();
    console.log(name);
    $.get(serverURL + 'add-sponsor?name='+name)
      .done(window.location = serverURL + 'add-sponsor');
  });
});
