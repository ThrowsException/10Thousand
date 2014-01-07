var mongoose = require('mongoose'),
    Achievement = mongoose.model('Achievement'),
    Update = mongoose.model('Update');

exports.list = function(req, res) {
  Achievement.find({ user: req.user._id }, function(error, data) {
    res.render('achievements', { achievements : data });
  });
};

exports.detail = function(req, res) {
  Achievement.findById(req.params.id).populate({ path: "updates", options: { sort: {date: 1 }}}).exec(function(error, achievement) {
    res.render('achievement', { achievement : achievement });
  });
};

exports.create = function(req, res) {
  Achievement.create({name: req.body.name, user: req.user._id}, function(error, result) {
    if(error) {
      res.send(error);
    }
    else {
      res.send(result);
    }
  });
};