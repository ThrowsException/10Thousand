//Articles service used for articles REST endpoint
angular.module('mean.articles').factory("Updates", ['$resource', function($resource) {
    return $resource('updates/:updateId', {
        updateId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);