define(function() {
  'use strict';

  function ChartsDevice(view) {
    this._view = view;
  }

  ChartsDevice.prototype.model = function(model) {
    if (typeof model != 'undefined') {
      this._model = model;
    }

    return this._model;
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

  ChartsDevice.prototype.render = function() {
    this._view.attr('class', this._model.type().toLowerCase().replace(/\s/g, '-'));

    var type = this._view.append('a').text(this._model.type()).attr('class', 'type');
    type.style('color', this._model.color());

    var ratio = this._view.append('span').text(this._model.ratio() + '%').attr('class', 'ratio');
    var number = this._view.append('span').text(_dottedNumber(this._model.number()) + this._model.sign()).attr('class', 'number');
  };

  return ChartsDevice;

});
