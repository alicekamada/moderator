// Configuration options

var PORT = 3000;
var DBNAME = 'test';

// includes

var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');

// parse application/json

app.use(bodyParser.json());

// database intialize

var sequelize = new Sequelize(DBNAME, null, null, {
  dialect: 'sqlite',
  //storage: './database/data.sqlite'
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

Topic.hasMany(Question);
Question.belongsTo(Topic);

// create / sync tables

sequelize.sync();

//routes

app.use(express.static(__dirname + '/public'));

// route for all verbs on /api/topics

app.route('/topics')
  .get(function(req,res) {
    Topic.findAll().then(function(topics) {
      res.send(topics);
    });
  })
  .post(function(req,res) {
    Topic.create({
      title: req.body.title
    }).then(function(topic) {
      res.send(topic);
    });
  });

// route for all verbs on /api/topics/:id

app.route('/topics/:id')
  .get(function(req,res) {
    Topic.find({ where: { id: req.params.id }, include: [ Question ] }).then(function(topic) {
      res.send(topic);
    });
  })
  .put(function(req,res) {
    Topic.find({ where: { id: req.params.id } }).then(function(topic) {
      topic.title = req.body.title;
      topic.save().then(function(topic) {
        res.send(topic);
      });
    });
  });

// route for all verbs on /api/questions

app.route('/questions')
  .get(function(req,res) {
    Question.findAll().then(function(questions) {
      res.send(questions);
    });
  })
  .post(function(req,res) {
    Question.create({
      topicId: req.body.topicId,
      title: req.body.title,
      author: req.body.author
    }).then(function(question) {
      res.send(question);
    });
  });

// route for all verbs on /api/questions/:id

app.route('/questions/:id')
  .get(function(req,res) {
    Question.find({ where: { id: req.params.id }}).then(function(question) {
      res.send(question);
    });
  })
  .put(function(req,res) {
    Question.find({ where: { id: req.params.id } }).then(function(question) {
      question.title = req.body.title;
      if (req.body.method === 'upvote') { question.votesUp++; }
      if (req.body.method === 'downvote') { question.votesDown++; }
      question.save().then(function(question) {
        res.send(question);
      });
    });
  });


// Start server

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
});
