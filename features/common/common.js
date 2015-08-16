(function() {
  'use strict';

  requirejs(['./config'], function(config) {
    requirejs(['d3', '../charts/charts', '../charts/charts-model'], function(d3, Charts, ChartsModel) {

      var createChart  = function(title, total, mainColor, devices) {
        var chartModel = new ChartsModel(title, total),
            chartController = new Charts(d3.select('#chart-' + title), mainColor);

        chartController.model(chartModel);

        devices.forEach(function(device) {
          chartController.addDevice(device.type, device.number, device.color);
        });

        chartController.render();
      };

      createChart('Revenue', 200000, '#1DE9B6', [{
        type: 'Smartphone',
        number: 80000,
        color: '#1DE9B6'
      }, {
        type: 'Tablet',
        number: 120000,
        color: '#00BFA5'
      }]);

      createChart('Impresions', 50000000, '#2196F3', [{
        type: 'Smartphone',
        number: 30000000,
        color: '#3F51B5'
      }, {
        type: 'Tablet',
        number: 20000000,
        color: '#2196F3'
      }]);

      createChart('Visits', 600000000, '#FFC107', [{
        type: 'Smartphone',
        number: 120000000,
        color: '#B71C1C'
      }, {
        type: 'Tablet',
        number: 480000000,
        color: '#FFC107'
      }]);

    });
  });

})();