var mongoose = require('mongoose'),
    Achievement = mongoose.model('Achievement'),
    Update = mongoose.model('Update');

exports.list = function(req, res) {
  Achievement.find({ user: req.user._id }, function(error, data) {
    res.render('achievements', { achievements : data });
  });
};

exports.detail = function(req, res) {
  Achievement.findById(req.params.id , function(error, data) {
    //lets keep the updates array in order by date
    console.log(data);
    if(data && data.updates){
      data.updates.sort(function(a, b) {
        //guard against nulls or undefined in the array
        if(a && b) {
          return a.time_ms - b.time_ms;
        }
      });
      res.render('achievement', { achievement : data });
    }
    else {
      res.render('achievement', { achievement : data });
    }
  });
};

exports.create = function(req, res) {
  var achievement = new Achievement(req.body)
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