var http = require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express);

var routes = require('./routes');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/node-ten-thousand';

//Bootstrap db connection
var db = mongoose.connect(mongoUri);

//Prettify HTML
app.locals.pretty = true;

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
//express/mongo session storage
app.use(express.session({
    secret: 'tenthousandapp',
    store: new mongoStore({
        db: db.connection.db,
        collection: 'sessions'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//Bootstrap models. thanks mean http://mean.io
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

//bootstrap passport config
require('./config/passport')(passport);


var achievements = require('./app/controllers/achievements');

app.get('/', showAcheivementsIfAuth, routes.index);
app.get('/achievements', loggedIn, achievements.list);
app.get('/achievements/:id', loggedIn, achievements.detail);
app.post('/achievement', loggedIn, achievements.create);

var updates = require('./app/controllers/updates');
app.post('/update/:id', loggedIn, updates.create);


var users = require('./app/controllers/users');
app.get('/signup', users.signup);
app.post('/user', users.create);
app.post('/login',
  passport.authenticate('local', { successRedirect: '/achievements',
                                   failureRedirect: '/',
                                   failureFlash: false })
);

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

function showAcheivementsIfAuth(req, res, next) {
  if (req.user) {
    res.redirect('/achievements');
  } else {
    next();
  }
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});