define([
   "backbone",
   "marionette",
   "./app",
   "views/AchievementView",
   "views/AchievementCollectionView",
   "views/LoginView",
   "collections/Achievements",
   "models/Achievement"
],
function (Backbone, Marionette, app, AchievementView, AchievementCollectionView, LoginView, Achievements, Achievement){

    "use strict";

    var AppRouter = Backbone.Marionette.AppRouter.extend({

        routes: {
            "" : "home",
            "achievementStats/:id" : "detail",
            "login" : "login"
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
        },

        login: function() {
          app.main.show(new LoginView())
        }
    });

    return new AppRouter();

});