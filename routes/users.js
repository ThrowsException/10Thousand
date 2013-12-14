var UserController = require('../UserController').UserController;

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'localhost';

var userController = new UserController(mongoUri, 27017);

exports.signup = function(req, res){
  res.render('signup');
};

exports.create = function(req, res){
  userController.create(req.body, function(error, result) {
    if(error) {
      res.send(error);
    }
    else {
      res.redirect('/');
    }
  });
};