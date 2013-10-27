define([
  'underscore', 
  'backbone', 
  'marionette', 
  'models/achievement', 
  'collections/Achievements', 
  'views/AchievementItemView', 
  'text!templates/AchievementCollectionViewTemplate.html'], 
  function(_, Backbone, Marionette, Achievement, Achievements, AchievementItemView, html) {
  
    var AchievementCollectionView = Backbone.Marionette.CompositeView.extend({
      collection: new Achievements(),
      
      events: {
        'click #add': 'add'
      },

      itemView: AchievementItemView,
      itemViewContainer: 'ul',
      template: _.template(html),
      
      initialize: function() {
        this.collection.fetch();
      },

      add: function (){
        var data = {}
        data.name = $('#newAchievement').val();

        $.ajax({
          type: "POST",
          url: "/achievement",
          data: data
        });
      }

    });

  return AchievementCollectionView;
});