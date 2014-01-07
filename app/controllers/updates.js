var mongoose = require('mongoose'),
    Achievement = mongoose.model('Achievement'),
    Update = mongoose.model('Update');

exports.create = function(req, res) {
  var update = new Update({ date: req.body.date, hours: req.body.hours, achievement_id: req.params.id });
  Achievement.findById(req.params.id, function(err, achievement) {

    update.save(function(err){
      achievement.updates.push(update);
      achievement.save();
      res.send(update);
    });
  });
};