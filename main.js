var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var AchievementController = require('./AchievementController').AchievementController;

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname));

var achievementController = new AchievementController('localhost', 27017);


app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/achievements', function(req, res) {
  achievementController.findAll(function(error, docs) {
    res.send(docs);
  });
});

app.get('/achievementStats/:id', function(req, res) {
  achievementController.findById(req.params.id, function(error, docs) {
    //lets keep the updates array in order by date
    if(docs && docs.updates){
      docs.updates.sort(function(a, b) {
        //guard against nulls or undefined in the array
        if(a && b) {
          return a[0] - b[0];
        }
      });
      res.send(docs);
    }
    else {
      res.send(docs);
    }
  });
});

app.post('/achievement', function(req, res) {
  achievementController.create(req.body.name, function(error, result) {
    if(error) {
      res.send(error);
    }
    else {
      res.send(result);
    }
  });
});

app.put('/achievementStats/:id', function(req, res) {
  var update = [];
  update.push(Number(req.body.date), Number(req.body.hours));
  achievementController.save({
    id: req.params.id,
    update: update
  }, function(error, result) {
    res.send(result);
  });
});

app.listen(3000);
console.log('Listening at 3000');