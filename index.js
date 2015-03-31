// Configuration options

var PORT = 3000;
var DBNAME = 'test';

// includes

var express = require('express');
var app = express();
var Sequelize = require('sequelize');

var sequelize = new Sequelize(DBNAME, {
  dialect: 'sqlite',
  storage: './database/data.sqlite'
});


app.use(express.static(__dirname + '/public'));

// Start server

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
});
