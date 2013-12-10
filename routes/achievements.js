
/*
 * GET users listing.
 */
var AchievementController = require('../AchievementController').AchievementController;

var achievementController = new AchievementController('localhost', 27017);

exports.list = function(req, res){
  achievementController.findAll(req.user._id, function(error, data) {
    res.render('achievements', { achievements : data });
  });
};

exports.detail = function(req, res){
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
      es.render('achievement', { achievement : data });
    }
  });
};