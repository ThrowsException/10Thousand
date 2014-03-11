//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/achievements', {
            templateUrl: 'views/achievements/list.html'
        }).
        when('/achievements/create', {
            templateUrl: 'views/achievements/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/achievements/edit.html'
        }).
        when('/achievements/:achievementId', {
            templateUrl: 'views/achievements/view.html'
        }).
        when('/', {
            templateUrl: 'views/achievements/list.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);