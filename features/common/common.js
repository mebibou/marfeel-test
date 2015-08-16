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

      createChart('Revenue', 200000, '#4dd025', [{
        type: 'Smartphone',
        number: 80000,
        color: '#005d00'
      }, {
        type: 'Tablet',
        number: 120000,
        color: '#4dd025'
      }]);

      createChart('Impresions', 50000000, '#00475b', [{
        type: 'Smartphone',
        number: 30000000,
        color: '#00475b'
      }, {
        type: 'Tablet',
        number: 20000000,
        color: '#0ac3e2'
      }]);

      createChart('Visits', 600000000, '#febf00', [{
        type: 'Smartphone',
        number: 120000000,
        color: '#d44e0f'
      }, {
        type: 'Tablet',
        number: 480000000,
        color: '#febf00'
      }]);

    });
  });

})();
