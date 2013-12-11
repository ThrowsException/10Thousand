var http = require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AchievementController = require('./AchievementController').AchievementController;
var UserController = require('./UserController').UserController;
var crypto = require('crypto');

var routes = require('./routes');
var achievements = require('./routes/achievements');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'tenthousandapp' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


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

app.get('/', routes.index);

app.get('/achievements', loggedIn, achievements.list);

app.get('/achievements/:id', loggedIn, achievements.detail);

app.put('/achievementStats/:id', loggedIn, achievements.put)

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
      res.redirect('/#login');
    }
  });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/achievements',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

