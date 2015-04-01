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

Topic.hasMany(Question, { as: 'Questions' });

// create / sync tables

sequelize.sync();

//routes

app.use(express.static(__dirname + '/public'));

// route for all verbs on /api/topics

app.route('/topics')
  .get(function(req,res) {

  })
  .post(function(req,res) {

  });

// route for all verbs on /api/topics/:id

app.route('/topics/:id')
  .get(function(req,res) {

  })
  .put(function(req,res) {

  })
  .update(function(req,res) {

  });

// Start server

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
});
