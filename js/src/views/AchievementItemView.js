define([
  'underscore', 
  'backbone', 
  'marionette',
  'text!templates/AchievementCollectionItemTemplate.html'], 
  function(_, Backbone, Marionette, html) {
  
    var AchievementItemView = Backbone.Marionette.ItemView.extend({
      tagName: "li",
      
      template: _.template(html)

    });

  return AchievementItemView;
});