var chDoc = document.getElementById('newCharity');

/* main function to add new data to database and build table */
/*document.addEventListener('DOMContentLoaded', function() {
  chDoc.addEventListener('submit', function(event) {
    var req = new XMLHttpRequest();

    req.open('GET', '/addCharity?' + 'name=' + chDoc.elements.name.value + '&website=' + chDoc.elements.website.value +
                 '&charityDescription=' + chDoc.elements.charityDescription.value, true);
    req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        var table = document.getElementById('charityTable');
        var newTable = document.createElement('tbody');   // create a new table to add new entries to
        newTable.id = 'charityTable';
        // loop to insert all database entries into updated table
        for(var entry in response) {
          addRow(response[entry], newTable.insertRow(entry));
        }
        table.parentNode.replaceChild(newTable, table);    // replace old table with updated table
      } else {
        console.log('Error in network request: ' + request.statusText);
      }
    });
    req.send('/addCharity' + 'name=' + chDoc.elements.name.value + '&website=' + chDoc.elements.website.value +
                 '&charityDescription=' + chDoc.elements.charityDescription.value);
    event.preventDefault();
  });
});*/

/* addRow function populates each new row with data from the database. */
/*function addRow(entry, newRow) {
  var name = document.createElement('td');
  name.textContent = entry.name;
  newRow.appendChild(name);

  var website = document.createElement('td');
  reps.textContent = entry.website;
  newRow.appendChild(website);

  var charityDescription = document.createElement('td');
  weight.textContent = entry.charityDescription;
  newRow.appendChild(charityDescription);
};*/