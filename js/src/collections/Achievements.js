define(['underscore', 'backbone'], 
  function(_, Backbone) {
  
  var AchievementCollection = Backbone.Collection.extend({

    url: '/achievements',

  return AchievementCollection;
});