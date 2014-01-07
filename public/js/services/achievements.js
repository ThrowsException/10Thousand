//Articles service used for articles REST endpoint
angular.module('mean.articles').factory("Achievements", ['$resource', function($resource) {
    return $resource('achievements/:achievementId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);