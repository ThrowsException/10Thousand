define(['backbone'], function(Backbone) {
  var Achievement = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: '/achievementStats'
  });

  return Achievement;
});