var updates = achievement.updates || [];
var series = [];
if(updates) {
  var max = updates.length;
  var totalHours = 0;
  for(var i = 0; i < max; i++) {
    var entry = updates[i];
    totalHours = totalHours + entry.hours;
    series.push([entry.time_ms, totalHours]);
  }

  var chart = new Highcharts.Chart({
    chart: {
      renderTo: $("#chart")[0],
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

function sortUpdates() {
  totalHours = 0;
  updates.sort(function(a, b) {
    //guard against nulls or undefined in the array
    if(a && b) {
      return a[0] - b[0];
    }
  });
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

function update() {
  $.ajax({
    url: "/achievementStats/" + achievement._id,
    method: "PUT",
    beforeSend: function() { if(chart.showLoading === 'function') { chart.showLoading(); } },
    data: {
      date: Date.parse($("#input-date").val() + ' UTC'),
      hours: $("#input-hours").val()
    }
  })
  .done(function(data) {
    totalHours = 0;
    updates.push(data);
    sortUpdates();
    chart.series[0].setData(sumUpdates());
  })
  .always(function() { 
    chart.hideLoading() 
  });    
}

$('#submit').click(update);
