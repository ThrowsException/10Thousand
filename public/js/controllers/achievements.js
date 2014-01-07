angular.module('mean.articles').controller('AchievementsController', ['$scope', '$routeParams', '$location', 'Global', 'Achievements', 'Updates', function ($scope, $routeParams, $location, Global, Achievements, Updates) {
    $scope.global = Global;
    var updates = [];
    var chart; 
    $scope.create = function() {
        var achievement = new Achievements({
            name: this.name
        });
        achievement.$save(function(response) {
            $location.path("achievements/" + response._id);
        });

        this.name = "";
    };

    $scope.remove = function(article) {
        if (article) {
            article.$remove();  

            for (var i in $scope.articles) {
                if ($scope.articles[i] == article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }
        else {
            $scope.article.$remove();
            $location.path('articles');
        }
    };

    $scope.update = function() {
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article._id);
        });
    };

    $scope.find = function() {
        Achievements.query(function(achievements) {
            $scope.achievements = achievements;
        });
    };

    $scope.findOne = function() {
        Achievements.get({
            achievementId: $routeParams.achievementId
        }, function(achievement) {
            $scope.achievement = achievement;
            createChart(achievement);
        });
    };

    $scope.sendUpdate = function() {
      $.ajax({
        url: "/update/" + $scope.achievement._id,
        method: "POST",
        beforeSend: function() { if(chart.showLoading === 'function') { chart.showLoading(); } },
        data: {
          date: Date.parse($("#date").val() + ' UTC'),
          hours: $("#hours").val()
        }
      })
      .done(function(data) {
        totalHours = 0;
        updates.push(data);
        sortUpdates();
        chart.series[0].setData(sumUpdates());
      })
      .always(function() { 
        chart.hideLoading();
      });    
    };

    function createChart(achievement) {
        updates = achievement.updates;
        var series = [];
        if(updates) {
          var max = updates.length;
          var totalHours = 0;
          
          for(var i = 0; i < max; i++) {
            var entry = updates[i];
            totalHours = totalHours + entry.hours;
            series.push([entry.time_ms, totalHours]);
          }

          chart = new Highcharts.Chart({
            chart: {
              renderTo: angular.element("#chart")[0],
              type: 'area'
            },
            legend: {
              enabled: false
            },
            title:{
              text: achievement.name
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
    }

    function sumUpdates() {
      var newSeries = [];
      for(var i = 0; i < updates.length; i++) {
        var entry = updates[i];
        totalHours = totalHours + entry.hours;
        newSeries.push([entry.time_ms, totalHours]);
      }

      return newSeries;
    }

    function sortUpdates() {
      totalHours = 0;
      updates.sort(function(a, b) {
        //guard against nulls or undefined in the array
        if(a && b) {
          return a.time_ms - b.time_ms;
        }
      });
    }

    //$('#submit').click(update);
}]);