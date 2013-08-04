define(["marionette", 'models/Achievement','views/AchievementView'], function(Marionette, Achievement, AchievementView) {
	var app = new Marionette.Application();

	app.addRegions({
		main: '#content'
	});

	app.addInitializer(function() {
		app.main.show(new AchievementView({
			model: new Achievement({
				_id: '513fccfa559a9ce329183004'
			})
		}));
	});

	return app;
});