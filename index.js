// Configuration options

var PORT = 3000;

// includes

var express = require('express');
var app = express();

// Start server

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
});
