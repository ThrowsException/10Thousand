define(['underscore', 'backbone', 'marionette', 'highcharts', 'text!templates/AchievementViewTemplate.html'], function(_, Backbone, Marionette, Highcharts, html) {
	var AchievementView = Backbone.Marionette.ItemView.extend({

		template: _.template(html),

		chart: function() {},

		events: {
			"click #submit": "submit"
		},

		submit: function() {
			$.ajax({
				url: "/achievementStats/" + this.model.id,
				method: "PUT",
				data: {
					date: Date.parse($("#input-date").val() + ' UTC'),
					hours: $("#input-hours").val()
				}
			});
		},

		onRender: function() {
			var self = this;
			this.model.fetch({
				success: function(data) {
					if (data) {
						var updates = self.model.get("updates");
						var series = [];
						var max = updates.length;
						var totalHours = 0;
						for(var i = 0; i < max; i++) {
							if(updates[i]) {
								var entry = updates[i];
								totalHours = totalHours + entry[1];
								series.push([entry[0], totalHours]);
							}
						}

						this.chart = new Highcharts.Chart({
							chart: {
								renderTo: self.$el.find("div:first")[0],
								type: 'area'
							},
							xAxis: {
								type: 'datetime',
								tickInterval: 2 * 7 * 24 * 3600 * 1000, // two weeks
								tickWidth: 0,
								gridLineWidth: 1,
								labels: {
									align: 'left',
									x: -15,
									y: 10
								}
							},
							series: [{
								data: series
							}]
						});
					}
				},
				error: function() {
					self.$el.html("<h1>Nothing Here Silly</h1>");
				}
			});
		}
	});

	return AchievementView;
});