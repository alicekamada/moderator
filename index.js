// Configuration options

var PORT = 3000;
var DBNAME = 'test';

// includes

var express = require('express');
var app = express();
var Sequelize = require('sequelize');

// database intialize

var sequelize = new Sequelize(DBNAME, {
  dialect: 'sqlite',
  storage: './database/data.sqlite'
});

// models for sequelize

var Topic = sequelize.define('topic', {
  title: {
    type: Sequelize.STRING
  }
});

var Question = sequelize.define('question', {
  title: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  votesUp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  votesDown: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

// create / sync tables

sequelize.sync();

//routes

app.use(express.static(__dirname + '/public'));

// Start server

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
});
