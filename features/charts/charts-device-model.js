define(function() {
  'use strict';

  function ChartsDeviceModel(type, number, total, color) {
    this._type = type;
    this._number = number;
    this._ratio = Math.round(number / total * 100);
    this._color = color;
  }

  ChartsDeviceModel.prototype.type = function(type) {
    if (typeof type != 'undefined') {
      this._type = type;
    }

    return this._type;
  };

  ChartsDeviceModel.prototype.number = function(number) {
    if (typeof number != 'undefined') {
      this._number = number;
    }

    return this._number;
  };

  ChartsDeviceModel.prototype.ratio = function(ratio) {
    if (typeof ratio != 'undefined') {
      this._ratio = ratio;
    }

    return this._ratio;
  };

  ChartsDeviceModel.prototype.color = function(color) {
    if (typeof color != 'undefined') {
      this._color = color;
    }

    return this._color;
  };

  return ChartsDeviceModel;

});
