// Configuration options

var PORT = 3000;

// includes

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// Start server

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
});
