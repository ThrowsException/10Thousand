var UserController = require('../UserController').UserController;

var userController = new UserController('localhost', 27017);

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