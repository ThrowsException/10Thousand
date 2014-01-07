var mongoose = require('mongoose'),
    Achievement = mongoose.model('Achievement'),
    Update = mongoose.model('Update');

exports.list = function(req, res) {
  Achievement.find({ user: req.user._id }, function(error, data) {
    res.render('achievements', { achievements : data });
  });
};

exports.detail = function(req, res) {
  Achievement.findById(req.params.id , function(error, achievement) {
    Update.find({ acheivement_id : req.params.id }, function(error, updates) {
      achievements.updates = updates;
       res.render('achievement', { achievement : achievements });
    });
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

exports.put = function(req, res) {
  var update = new Update(req.body);
  Achievement.findById(req.params.id, function(error, data) {
    data.updates.push(update);
    data.save(function(err, data, numberAffected){
      res.json(data);
    });
  });
};