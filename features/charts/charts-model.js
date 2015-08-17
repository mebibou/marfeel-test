define(['./charts-device-model'], function(ChartsDeviceModel) {
  'use strict';

  function ChartsModel(title, total, sign) {
    this._title = title;
    this._total = total;
    this._sign = sign || '';
    this._devices = [];
  }

  ChartsModel.prototype.title = function(title) {
    if (typeof title != 'undefined') {
      this._title = title;
    }

    return this._title;
  };

  ChartsModel.prototype.total = function(total) {
    if (typeof total != 'undefined') {
      this._total = total;
    }

    return this._total;
  };

  ChartsModel.prototype.sign = function(sign) {
    if (typeof sign != 'undefined') {
      this._sign = sign;
    }

    return this._sign;
  };

  ChartsModel.prototype.devices = function() {
    return this._devices;
  };

  ChartsModel.prototype.addDevice = function(title, number, color) {
    if (this.isComplete()) {
      return;
    }

    var device = new ChartsDeviceModel(title, number, this._total, color, this._sign);
    this._devices.push(device);
    return device;
  };

  ChartsModel.prototype.isComplete = function() {
    var total = 0;

    this._devices.forEach(function(device) {
      total += device.number();
    });

    return total === this._total;
  };

  return ChartsModel;

});
