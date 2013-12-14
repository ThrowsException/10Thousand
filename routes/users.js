var UserController = require('../UserController').UserController;

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/node-ten-thousand';

var userController = new UserController(mongoUri);

exports.signup = function(req, res) {
  res.render('signup');
};

exports.create = function(req, res) {
  userController.create(req.body, function(error, result) {
    if(error) {
      res.send(error);
    }
    else {
      res.redirect('/');
    }
  });
};