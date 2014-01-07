var mongoose = require('mongoose'),
    Achievement = mongoose.model('Achievement'),
    Update = mongoose.model('Update');

exports.list = function(req, res) {
  Achievement.find({ user: req.user._id }, function(error, data) {
    res.jsonp(data);
  });
};

exports.detail = function(req, res) {
  Achievement.findById(req.params.id).populate({ path: "updates", options: { sort: {date: 1 }}}).exec(function(error, achievement) {
    res.jsonp(achievement);
  });
};

exports.create = function(req, res) {
  Achievement.create({name: req.body.name, user: req.user._id}, function(error, result) {
    console.log(result);
    res.jsonp(result);
  });
};