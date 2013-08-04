require.config({
	baseUrl: "js/src",
	paths: {
		backbone: '../lib/backbone',
		underscore: '../lib/underscore',
		jquery: '../lib/jquery',
		marionette: '../lib/core/amd/backbone.marionette',
		'backbone.wreqr': '../lib/backbone.wreqr',
		'backbone.babysitter': '../lib/backbone.babysitter',
		highcharts: 'http://code.highcharts.com/highcharts.src'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		'backbone.wreqr': {
			deps: ['backbone'],
			exports: 'Backbone.Wreqr'
		},
		'backbone.babysitter': {
			deps: ['backbone'],
			exports: 'Backbone.ChildViewContainer'
		},
		highcharts: {
			deps: ['jquery'],
			exports: 'Highcharts'
		}
	}
});

require(['../app'], function(app) {
	app.start();
});