angular.module('mean.articles').controller('DemoAchievementsController', ['$scope', 'Global', function ($scope, Global) {
    $scope.date = new Date();
    $scope.hours = 0;

    $scope.achievement = [];
    $scope.updates = [];
    $scope.totalHours = 0;
    $scope.achievement.name = "Learning Italian";

    $scope.sendUpdate = function() {
      var data = { date: $scope.date, hours: $scope.hours };
      
      $scope.hours = 0;
      $scope.totalHours = 0;
      $scope.updates.push(data);
      sortUpdates();
      $scope.chart.series[0].setData(sumUpdates());
    };

    $scope.createChart = function() {
        var series = [];
        
        var max = $scope.updates.length;
        var totalHours = 0;
        
        for(var i = 0; i < max; i++) {
          var entry = $scope.updates[i];
          $scope.totalHours = $scope.totalHours + entry.hours;
          series.push([entry.time_ms, totalHours]);
        }

        $scope.chart = new Highcharts.Chart({
          chart: {
            renderTo: angular.element("#chart")[0],
            type: 'area'
          },
          legend: {
            enabled: false
          },
          title:{
            text: $scope.achievement.name
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
          yAxis: {
            title: {
              text: "Hours"
            }
          },
          series: [{
            data: series
          }]
        });
    };

    function sumUpdates() {
      var newSeries = [];
      for(var i = 0; i < $scope.updates.length; i++) {
        var entry = $scope.updates[i];
        $scope.totalHours = $scope.totalHours + entry.hours;
        newSeries.push([entry.time_ms, $scope.totalHours]);
      }

      return newSeries;
    }

    function sortUpdates() {
      $scope.totalHours = 0;
      $scope.updates.sort(function(a, b) {
        //guard against nulls or undefined in the array
        if(a && b) {
          return a.time_ms - b.time_ms;
        }
      });
    }
}]);