
/*
 * GET users listing.
 */
var AchievementController = require('../app/controllers/achievements').AchievementController;

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/node-ten-thousand';

var achievementController = new AchievementController(mongoUri);

exports.list = function(req, res) {
  achievementController.findAll(req.user._id, function(error, data) {
    res.render('achievements', { achievements : data });
  });
};

exports.detail = function(req, res) {
  achievementController.findById(req.params.id, function(error, data) {
    //lets keep the updates array in order by date
    if(data && data.updates){
      data.updates.sort(function(a, b) {
        //guard against nulls or undefined in the array
        if(a && b) {
          return a[0] - b[0];
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
  achievementController.create(req.body.name, req.user._id, function(error, result) {
    if(error) {
      res.send(error);
    }
    else {
      res.send(result);
    }
  });
};

exports.put = function(req, res) {
  var update = [];
  update.push(Number(req.body.date), Number(req.body.hours));
  achievementController.save({
    id: req.params.id,
    update: update
  }, function(error, result) {
    res.json(result);
  });
};