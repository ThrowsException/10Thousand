define(["marionette", 'collections/Achievements','views/AchievementCollectionView', 'views/AchievementView'], 
  function(Marionette, Achievements, AchievementCollectionView, AchievementView) {
    var app = new Marionette.Application();

    app.addRegions({
      main: '#content'
    });

    app.addInitializer(function() {
      app.main.show(new AchievementCollectionView({
        collection: new Achievements()
      })
    );

    // app.main.show(new AchievementView({
    //  model: new Achievement({
    //    _id: '513fccfa559a9ce329183004'
    //  })
    // })
    // );
  });

  return app;
});