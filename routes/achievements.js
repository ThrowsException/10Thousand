
/*
 * GET users listing.
 */
var AchievementController = require('../AchievementController').AchievementController;

var achievementController = new AchievementController('localhost', 27017);

exports.list = function(req, res){
  achievementController.findAll(req.user._id, function(error, docs) {
    res.render('achievements', { achievements : docs });
  });
};

exports.detail = function(req, res){
  achievementController.findById(req.params.id, function(error, docs) {
    //lets keep the updates array in order by date
    if(docs && docs.updates){
      docs.updates.sort(function(a, b) {
        //guard against nulls or undefined in the array
        if(a && b) {
          return a[0] - b[0];
        }
      });
      res.render('achievement', { updates : docs });
    }
    else {
      es.render('achievement', { updates : docs });
    }
  });
};