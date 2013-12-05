var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AchievementController = require('./AchievementController').AchievementController;
var UserController = require('./UserController').UserController;

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(__dirname));


var achievementController = new AchievementController('localhost', 27017);
var userController = new UserController('localhost', 27017);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  userController.findById(_id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    userController.getCollection(function(error, collection) {
      collection.findOne({}, function(err, user) {
        if (err) { console.log(err); return done(err); }
        if (!user) {
          console.log("no user");
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!password) {
          console.log("password invalid");
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    });
  }
));

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

app.put('/user', function(req, res) {
  userController.create(req.body, function(error, result) {
    if(error) {
      res.send(error);
    }
    else {
      res.send(result);
    }
  });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/#/login',
                                   failureFlash: false })
);

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