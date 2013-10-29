define(["marionette", 'collections/Achievements','views/AchievementCollectionView'], 
  function(Marionette, Achievements, AchievementCollectionView) {
    var app = new Marionette.Application();

    app.addRegions({
      main: '#content'
    });

    app.addInitializer(function() {
      app.main.show(new AchievementCollectionView({
        collection: new Achievements()
      })
    );
  });

  return app;
});