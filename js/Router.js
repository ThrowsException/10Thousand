define([
   "backbone",
   "marionette",
   "./app",
   "views/AchievementView",
   "models/Achievement"
],
function (Backbone, Marionette, app, AchievementView, Achievement){

    "use strict";

    var AppRouter = Backbone.Marionette.AppRouter.extend({

        routes: {

            "/" : "home",
            "achievementStats/:id" : "detail"
        },

        home: function() {
          app.main.show(new AchievementCollectionView({
            collection: new Achievements()
          }))
        },

        detail: function(id) {
          app.main.show(new AchievementView({
            model: new Achievement({
             _id: id
            })
          }));
        }
    });

    return new AppRouter();

});