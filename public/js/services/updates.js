//Articles service used for articles REST endpoint
angular.module('mean.articles').factory("Updates", ['$resource', function($resource) {
    return $resource('update/:achievementId', {
        achievementId: '@achievementId'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);