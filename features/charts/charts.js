define(['d3', '../common/progressive-pie', './charts-device'], function(d3, ProgressivePie, ChartsDevice) {
  'use strict';

  var template = d3.select('#chart-template').html();

  function Charts(view, mainColor) {
    this._view = view;
    this._view.html(template);
    this._view.selectAll('.line').style('background-color', mainColor);
    this._chart = this._view.select('.chart');
    this._deviceContainer = this._view.select('.device-container');
  }

  Charts.prototype.model = function(model) {
    if (typeof model != 'undefined') {
      this._model = model;
    }

    return this._model;
  };

  Charts.prototype.addDevice = function(title, number, color) {
    var deviceModel = this._model.addDevice(title, number, color),
        deviceController = new ChartsDevice(this._deviceContainer.append('div'));

    deviceController.model(deviceModel);
    deviceController.render();
  };

  function _dottedNumber(number, text) {
    text = text || '';
    if (number > 1000) {
      text = text + '.000';
      return _dottedNumber(Math.round(number / 1000), text);
    }
    else {
      return number + text;
    }
  }

  Charts.prototype.render = function() {
    var pie = new ProgressivePie(this._chart, 200, 200, 15);

    this._model.devices().forEach(function(device) {
      pie.addStep(device.ratio(), device.color());
    });

    var title = this._view.select('.title');
    title.text(this._model.title());

    var total = this._model.total(),
        totalText = this._chart.select('.total').select('.number');

    pie.render(function(percent) {
      totalText.text(_dottedNumber(Math.round(percent * total)));
    });
  };

  return Charts;

});
