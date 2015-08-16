define(['charts/charts-model', 'charts/charts-device-model'], function(ChartsModel, ChartsDeviceModel) {
  'use strict';

  describe('charts', function() {

    it('should load the models', function() {
      expect(ChartsModel).not.toBe(null);
      expect(ChartsDeviceModel).not.toBe(null);
    });

    it('should have a type and ratio', function() {

      var type = 'test',
          number = 40,
          total = 200,
          device = new ChartsDeviceModel(type, number, total);

      expect(device.type()).toBe(type);
      expect(device.ratio()).toBe(number / total * 100);

    });

    it('should have a complete chart', function() {

      var charts = new ChartsModel('test', 100);
      expect(charts.isComplete()).toBe(false);

      charts.addDevice('first', 20);
      expect(charts.isComplete()).toBe(false);

      charts.addDevice('second', 40);
      expect(charts.isComplete()).toBe(false);

      charts.addDevice('second', 40);
      expect(charts.isComplete()).toBe(true);

      // cannot add more
      charts.addDevice('second', 40);
      expect(charts.isComplete()).toBe(true);
      expect(charts.devices().length).toBe(3);

    });

  });

});
