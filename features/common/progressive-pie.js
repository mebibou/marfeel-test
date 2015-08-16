define(function() {
  'use strict';

  var ANIMATION_DURATION = 1000;

  function ProgressivePieStep(number, element, width, height, thickness, start, end, color) {
    var radius = Math.min(width, height) / 2,
        pie = d3.layout.pie().sort(null);

    var arc = d3.svg.arc()
          .innerRadius(radius - thickness)
          .outerRadius(radius),
        svg = null,
        path = null;

    this.render = function() {
      svg = element.append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      path = svg.selectAll('path')
        .data(pie([0, 100]))
        .enter().append('path')
        .attr('fill', function(d, i) {
          if (i === 0) {
            return color;
          }
          else {
            return 'rgba(0, 0, 0, 0)';
          }
        })
        .attr('d', arc)
        .each(function(d) {
          this._current = d;
        });
    };

    this.animate = function(onProgress) {
      var progress = 0;
      path = path.data(pie([end, 100 - end]));
      path.transition().duration(ANIMATION_DURATION * number).attrTween('d', function(a) {
        var i  = d3.interpolate(this._current, a);
        var i2 = d3.interpolate(progress, end);
        this._current = i(0);

        return function(t) {
          if (onProgress) {
            onProgress(i2(t) / 100);
          }
          return arc(i(t));
        };
      });
    };
  }

  function ProgressivePie(view, width, height, thickness) {
    this._view = view;
    this._width = width || 200;
    this._height = height || 200;
    this._thickness = thickness || 10;
    this._steps = [];
  }

  ProgressivePie.prototype.addStep = function(percent, color) {
    this._steps.push({
      percent: percent,
      color: color
    });
  };

  ProgressivePie.prototype.render = function(onProgress) {
    var view = this._view,
        width = this._width,
        height = this._height,
        thickness = this._thickness,
        pies = [];

    // background pie
    new ProgressivePieStep(0, view, width, height, thickness, 0, 100, '#333333').render();

    var len = this._steps.length,
        progress = 0;

    for (var i = 0; i < len; i++) {
      var step = this._steps[i],
          start = 0,
          end = 100;

      if (i === 0) {
        end = step.percent;
      }
      else if (i === this._steps.length - 1) {
        start = progress;
      }
      else {
        start = progress;
        end = start + step.percent;
      }

      progress = end;

      pies.push(new ProgressivePieStep(i + 1, view, width, height, thickness, start, end, step.color));
    }

    // render pies in reverse order to see the first one to animate first
    for (var i = pies.length - 1; i >= 0; i--) {
      pies[i].render();
    }

    var animate = function(pie, last) {
      pie.animate(last ? onProgress : null);
    };

    len = pies.length;
    for (var i = 0; i < len; i++) {
      animate(pies[i], i === len - 1);
    }

  };

  return ProgressivePie;

});
