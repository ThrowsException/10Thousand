angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Achievements",
        "link": "achievements"
    }];
    
    $scope.isCollapsed = false;
}]);