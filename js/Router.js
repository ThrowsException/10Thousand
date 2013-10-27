define([
   "backbone",
   "marionette",
   "./app"
],
function (Backbone, Marionette, app){

    "use strict";

    var AppRouter = Backbone.Marionette.AppRouter.extend({

        routes: {

            "/" : "home",
            "application/:id" : "detail"
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