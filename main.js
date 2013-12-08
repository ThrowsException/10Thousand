var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AchievementController = require('./AchievementController').AchievementController;
var UserController = require('./UserController').UserController;
var crypto = require('crypto');

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

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' //for completeness
  },
  function(email, password, done) {
    userController.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      crypto.pbkdf2(password, user.salt.buffer, 10000, 512, function(err, derivedKey) {
        password = derivedKey.toString('base64');
        if (!user.password || user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        else {
          return done(null, user);
        }
      });
    });
  })
);

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/achievements', loggedIn, function(req, res) {
  achievementController.findAll(req.user._id, function(error, docs) {
    res.send(docs);
  });
});

app.get('/achievementStats/:id', loggedIn, function(req, res) {
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

app.post('/achievement', loggedIn, function(req, res) {
  achievementController.create(req.body.name, req.user._id, function(error, result) {
    if(error) {
      res.send(error);
    }
    else {
      res.send(result);
    }
  });
});

app.post('/user', function(req, res) {
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
                                   failureRedirect: '/#login',
                                   failureFlash: false })
);

app.put('/achievementStats/:id', loggedIn, function(req, res) {
  var update = [];
  update.push(Number(req.body.date), Number(req.body.hours));
  achievementController.save({
    id: req.params.id,
    update: update
  }, function(error, result) {
    res.send(result);
  });
});

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send(401, {});
  }
}

app.listen(3000);
console.log('Listening at 3000');

