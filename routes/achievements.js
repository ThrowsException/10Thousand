
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