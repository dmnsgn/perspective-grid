(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PerspectiveGrid = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Defines a line by its affine function
 * @author Damien Seguin
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _MathHelper = require('./MathHelper');

/**
 * LineEquation defines a line equation or vertical
 * @param {LineParams} lineParams Line parameters
 * @param {number}     x          X position
 * @constructor
 */

var LineEquation = (function () {
  function LineEquation(lineParams, x) {
    _classCallCheck(this, LineEquation);

    this.vertical = lineParams === null;
    if (this.vertical) {
      this.x = x;
    } else {
      this.m = lineParams.m;
      this.c = lineParams.c;
    }
  }

  /**
   * Get intersection of two line equation
   * @param  {LineEquation} equation
   * @return {Point}
   */

  _createClass(LineEquation, [{
    key: 'intersect',
    value: function intersect(equation) {

      if (this.vertical && equation.vertical) {
        return null;
      }

      if (this.vertical) {
        return new _Point2['default'](this.x, (0, _MathHelper.getVerticalConvergence)(this.x, equation.m, equation.c));
      }

      if (equation.vertical) {
        return new _Point2['default'](equation.x, (0, _MathHelper.getVerticalConvergence)(equation.x, this.m, this.c));
      }

      return (0, _MathHelper.getConvergencePoint)(this.m, this.c, equation.m, equation.c);
    }
  }]);

  return LineEquation;
})();

exports['default'] = LineEquation;
module.exports = exports['default'];

},{"./MathHelper":2,"./Point":3}],2:[function(require,module,exports){
/**
 * @file Math utils file
 * @author Damien Seguin
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getDistance = getDistance;
exports.getConvergencePoint = getConvergencePoint;
exports.getVerticalConvergence = getVerticalConvergence;
exports.getLineParams = getLineParams;
exports.getParallelLine = getParallelLine;
exports.getDistanceToLine = getDistanceToLine;
exports.getProjectedPoint = getProjectedPoint;
exports.getMassCenter = getMassCenter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

/** @constant {number} */
var EPSILON = 0.0001;

exports.EPSILON = EPSILON;
/** @constant {number} */
var PI = Math.PI;

exports.PI = PI;
/** @constant {number} */
var TWO_PI = PI * 2;

exports.TWO_PI = TWO_PI;
/**
 * Get the distance between two points
 * @param {{x: number, y: number}} point1 First point
 * @param {{x: number, y: number}} point2 Second point
 * @returns {number}    Distance between point1 and point2
 */

function getDistance(point1, point2) {
  return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}

/**
 * Get the convergence point of two line equation
 * @param  {number} m1
 * @param  {number} c1
 * @param  {number} m2
 * @param  {number} c2
 * @return {Point}
 */

function getConvergencePoint(m1, c1, m2, c2) {

  if (Math.abs(m1 - m2) < EPSILON) {
    return null;
  }

  var point = new _Point2['default']();
  point.x = (c2 - c1) / (m1 - m2);
  point.y = point.x * m1 + c1;

  return point;
}

/**
 * Get the vertical convergence point from a X position
 * @param  {number} x
 * @param  {number} m
 * @param  {number} c
 * @return {number}
 */

function getVerticalConvergence(x, m, c) {
  return m * x + c;
}

/**
 * Return line parameters
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @return {{m:number, c: number}}
 */

function getLineParams(x1, y1, x2, y2) {

  var dx = x1 - x2;

  if (Math.abs(dx) < EPSILON) {
    return null;
  }

  var m = (y1 - y2) / dx;
  var c = y1 - m * x1;

  return {
    m: m,
    c: c
  };
}

/**
 * Get parallel line parameters
 * @param  {number} line
 * @param  {Point} point
 * @return {{m:number, c: number}}
 */

function getParallelLine(line, point) {

  var c = point.y - line.m * point.x;

  return {
    m: line.m,
    c: c
  };
}

/**
 * Get the distance to a line parameters
 * @param  {{m:number, c: number}} line
 * @param  {Point} point
 * @return {number}
 */

function getDistanceToLine(line, point) {
  return getDistance(point, getProjectedPoint(line, point));
}

/**
 * Get a projected point
 * @param  {{m:number, c: number}} line
 * @param  {Point} point
 * @return {Point}
 */

function getProjectedPoint(line, point) {

  var perpendicularm = -1 / line.m;
  var perpendicularc = point.y - perpendicularm * point.x;
  var x = (line.c - perpendicularc) / (perpendicularm - line.m);
  var y = line.m * x + line.c;

  return new _Point2['default'](x, y);
}

/**
 * Get the center of four points
 * @param  {Point} p1
 * @param  {Point} p2
 * @param  {Point} p3
 * @param  {Point} p4
 * @return {Point}
 */

function getMassCenter(p1, p2, p3, p4) {
  return new _Point2['default']((p1.x + p2.x + p3.x + p4.x) / 4, (p1.y + p2.y + p3.y + p4.y) / 4);
}

},{"./Point":3}],3:[function(require,module,exports){
/**
 * @file Defines a point
 * @author Damien Seguin
 */

'use strict';

/**
 * An object that defines a Point
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @constructor
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Point = (function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  /**
   * Check if a point is in a list of points
   * @param  {Array.<Point>}  list Array of Points
   * @return {Boolean}
   */

  _createClass(Point, [{
    key: 'isInList',
    value: function isInList(list) {
      for (var i = 0, len = list.length; i < len; i++) {
        if (this.x === list[i].x && this.y === list[i].y) {
          return true;
        }
      }
      return false;
    }
  }]);

  return Point;
})();

exports['default'] = Point;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
/**
 * @file Defines a segment between two points
 * @author Damien Seguin
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _LineEquation = require('./LineEquation');

var _LineEquation2 = _interopRequireDefault(_LineEquation);

var _MathHelper = require('./MathHelper');

/**
 * An object with two points that defines a segment
 * @param {Point} p1 First point
 * @param {Point} p1 Second point
 * @constructor
 */

var Segment = (function () {
  function Segment(p1, p2) {
    _classCallCheck(this, Segment);

    this.p1 = p1;
    this.p2 = p2;
  }

  /**
   * Get intersection of two segments
   * @param  {Segment} segment
   * @return {Point}
   */

  _createClass(Segment, [{
    key: 'intersect',
    value: function intersect(segment) {
      var line1 = new _LineEquation2['default']((0, _MathHelper.getLineParams)(this.p1.x, this.p1.y, this.p2.x, this.p2.y), this.p1.x);
      var line2 = new _LineEquation2['default']((0, _MathHelper.getLineParams)(segment.p1.x, segment.p1.y, segment.p2.x, segment.p2.y), segment.p1.x);

      return line1.intersect(line2);
    }
  }]);

  return Segment;
})();

exports['default'] = Segment;
module.exports = exports['default'];

},{"./LineEquation":1,"./MathHelper":2}],5:[function(require,module,exports){
/**
 * @file Perspective Grid
 * @author Damien Seguin
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libPoint = require('./lib/Point');

var _libPoint2 = _interopRequireDefault(_libPoint);

var _libSegment = require('./lib/Segment');

var _libSegment2 = _interopRequireDefault(_libSegment);

var _libLineEquation = require('./lib/LineEquation');

var _libLineEquation2 = _interopRequireDefault(_libLineEquation);

var _libMathHelper = require('./lib/MathHelper');

var MathHelper = _interopRequireWildcard(_libMathHelper);

var PerspectiveGrid = (function () {

  /**
   * Creates a new perspective grid
   * @param {CanvasRenderingContext2D} context The context to draw the grid in
   * @param {number} units                     Number of rows and columns
   * @param {Array<Point>} [squares]           Highlighted squares in the grid
   * @constructor
   */

  function PerspectiveGrid(context, units, squares) {
    _classCallCheck(this, PerspectiveGrid);

    this._lineCount = units + 1;
    this.gridUnitCount = units;
    this.context = context;

    this.squares = squares || [];
  }

  /**
   * Reset the corners (clockwise starting from top left)
   * @param {Point} tl Top left corner
   * @param {Point} tr Top right corner
   * @param {Point} br Bottom right corner
   * @param {Point} bl Bottom left corner
   */

  _createClass(PerspectiveGrid, [{
    key: 'init',
    value: function init(tl, tr, br, bl) {

      this._tl = tl;
      this._tr = tr;
      this._br = br;
      this._bl = bl;

      this.horizontal = [];
      this.vertical = [];

      var dy = (this._bl.y - this._tl.y) / this.gridUnitCount;
      var dx = (this._tr.x - this._tl.x) / this.gridUnitCount;

      for (var y = this._tl.y; y <= this._bl.y + MathHelper.EPSILON; y += dy) {
        this.horizontal[this.horizontal.length] = new _libSegment2['default'](new _libPoint2['default'](this._tl.x, y), new _libPoint2['default'](this._tr.x, y));
      }

      for (var x = this._tl.x; x <= this._tr.x + MathHelper.EPSILON; x += dx) {
        this.vertical[this.vertical.length] = new _libSegment2['default'](new _libPoint2['default'](x, this._tl.y), new _libPoint2['default'](x, this._bl.y));
      }
    }

    /**
     * Draw the grid in the instance context
     */
  }, {
    key: 'draw',
    value: function draw() {
      this.drawSquares();
      this.drawLines();
    }

    /**
     * Update grid segments
     */
  }, {
    key: 'update',
    value: function update() {

      // Get vanishing points and horizon
      var vVanishing = this._getVanishingEquation(MathHelper.getLineParams(this._tl.x, this._tl.y, this._bl.x, this._bl.y), MathHelper.getLineParams(this._tr.x, this._tr.y, this._br.x, this._br.y));
      var hVanishing = this._getVanishingEquation(MathHelper.getLineParams(this._tl.x, this._tl.y, this._tr.x, this._tr.y), MathHelper.getLineParams(this._bl.x, this._bl.y, this._br.x, this._br.y));

      var horizon = this._getHorizon(vVanishing, hVanishing);

      // Get border lines equations
      var topLine = MathHelper.getLineParams(this._tl.x, this._tl.y, this._tr.x, this._tr.y);
      var bottomLine = MathHelper.getLineParams(this._bl.x, this._bl.y, this._br.x, this._br.y);
      var leftLine = MathHelper.getLineParams(this._tl.x, this._tl.y, this._bl.x, this._bl.y);
      var rightLine = MathHelper.getLineParams(this._tr.x, this._tr.y, this._br.x, this._br.y);

      // Recalculate horizon
      if (horizon !== null) {
        horizon = new _libLineEquation2['default'](horizon, vVanishing.x);
      }

      // Recalculate lines
      topLine = new _libLineEquation2['default'](topLine, this._tl.x);
      bottomLine = new _libLineEquation2['default'](bottomLine, this._bl.x);
      leftLine = new _libLineEquation2['default'](leftLine, this._tl.x);
      rightLine = new _libLineEquation2['default'](rightLine, this._tr.x);

      var horizontal = undefined;
      var vertical = undefined;

      // Compute segment positions
      if (horizon === null) {
        horizontal = this._getEquidistantLines(this._tl, this._bl, this._tr, this._br);
        vertical = this._getEquidistantLines(this._tl, this._tr, this._bl, this._br);
      } else {
        horizontal = this._getLines(topLine, bottomLine, horizon, hVanishing);
        vertical = this._getLines(leftLine, rightLine, horizon, vVanishing);
      }

      this._updateLines(topLine, bottomLine, vertical, this.vertical);
      this._updateLines(leftLine, rightLine, horizontal, this.horizontal);
    }

    /**
     * Get the four vertices of a point in grid
     * @param  {number} column
     * @param  {number} row
     * @return {Array<Point>}
     */
  }, {
    key: 'getQuadAt',
    value: function getQuadAt(column, row) {

      var p1 = this.horizontal[row - 1].intersect(this.vertical[column - 1]);
      var p2 = this.horizontal[row - 1].intersect(this.vertical[column]);
      var p3 = this.horizontal[row].intersect(this.vertical[column - 1]);
      var p4 = this.horizontal[row].intersect(this.vertical[column]);

      if (this.debug) {
        this.drawPoint(p1, 4, 'black');
        this.drawPoint(p2, 4, 'black');
        this.drawPoint(p3, 4, 'black');
        this.drawPoint(p4, 4, 'black');
      }

      return [p1, p2, p3, p4];
    }

    /**
     * Get the center point from grid unit to pixel eg. (1, 1) is the first top left point
     * @param  {number} column
     * @param  {number} row
     * @return {Point}
     */
  }, {
    key: 'getCenterAt',
    value: function getCenterAt(column, row) {

      var center = MathHelper.getMassCenter.apply(null, this.getQuadAt(column, row));

      if (this.debug) {
        this.drawPoint(center, 4);
      }

      return center;
    }

    /**
     * Actually draw the lines (vertical and horizontal) in the context
     */
  }, {
    key: 'drawLines',
    value: function drawLines() {

      var segments = this.vertical.concat(this.horizontal);

      for (var i = 0; i < segments.length; i++) {
        this.context.beginPath();
        this.context.moveTo(segments[i].p1.x, segments[i].p1.y);
        this.context.lineTo(segments[i].p2.x, segments[i].p2.y);
        this.context.stroke();
        this.context.closePath();
      }
    }

    /**
     * Draw highlighted squares in the grid
     */
  }, {
    key: 'drawSquares',
    value: function drawSquares() {

      var points = this.squares;

      for (var i = 0; i < points.length; i++) {
        var point = points[i];

        if (point.x > this.gridUnitCount || point.y > this.gridUnitCount) {
          throw new Error('Point ' + point.x + ', ' + point.x + ' is not in the grid.');
        }

        var p1 = this.horizontal[point.y - 1].intersect(this.vertical[point.x - 1]);
        var p2 = this.horizontal[point.y - 1].intersect(this.vertical[point.x]);
        var p3 = this.horizontal[point.y].intersect(this.vertical[point.x - 1]);
        var p4 = this.horizontal[point.y].intersect(this.vertical[point.x]);

        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        this.context.lineTo(p4.x, p4.y);
        this.context.lineTo(p3.x, p3.y);
      }

      this.context.fill();
    }

    /**
     * Draw a single point in the grid useful for debug purpose
     * @param {Point} point
     * @param {number} radius
     * @param {string} color
     */
  }, {
    key: 'drawPoint',
    value: function drawPoint(point, radius, color) {
      this.context.save();
      this.context.beginPath();
      this.context.arc(point.x - radius / 2, point.y - radius / 2, radius, 0, MathHelper.TWO_PI, false);
      this.context.fillStyle = color || 'grey';
      this.context.fill();
      this.context.restore();
    }

    /**
     * Update lines (vertical and horizontal) equations
     * @private
     * @param {LineEquation} side
     * @param {LineEquation} oppositeSide
     * @param {Array<LineEquation>} lineEquations
     * @param {Segment} segments
     */
  }, {
    key: '_updateLines',
    value: function _updateLines(side, oppositeSide, lineEquations, segments) {

      for (var i = 0; i < lineEquations.length; i++) {
        var line = lineEquations[i];
        var begin = side.intersect(line);
        var end = oppositeSide.intersect(line);

        if (begin === null || end === null) {
          continue;
        }

        segments[i].p1.x = ~ ~begin.x;
        segments[i].p1.y = ~ ~begin.y;
        segments[i].p2.x = ~ ~end.x;
        segments[i].p2.y = ~ ~end.y;
      }
    }

    /**
     * Find the convergence point of two lines
     * @private
     */
  }, {
    key: '_getVanishingEquation',
    value: function _getVanishingEquation(side, oppositeSide) {

      var vanishing = undefined;

      if (side === null && oppositeSide === null) {
        vanishing = null;
      } else if (side === null) {
        vanishing = new _libPoint2['default'](this._tl.x, MathHelper.getVerticalConvergence(this._tl.x, oppositeSide.m, oppositeSide.c));
      } else if (oppositeSide === null) {
        vanishing = new _libPoint2['default'](this._tr.x, MathHelper.getVerticalConvergence(this._tr.x, side.m, side.c));
      } else {
        vanishing = MathHelper.getConvergencePoint(side.m, side.c, oppositeSide.m, oppositeSide.c);
      }

      return vanishing;
    }

    /**
     * Get line equations for equidistant lines
     * @private
     */
  }, {
    key: '_getEquidistantLines',
    value: function _getEquidistantLines(sideStart, sideEnd, matchingStart, matchingEnd) {

      var lines = [];
      var delta = new _libPoint2['default']((sideEnd.x - sideStart.x) / this.gridUnitCount, (sideEnd.y - sideStart.y) / this.gridUnitCount);
      var matchingDelta = new _libPoint2['default']((matchingEnd.x - matchingStart.x) / this.gridUnitCount, (matchingEnd.y - matchingStart.y) / this.gridUnitCount);

      for (var i = 0; i < this._lineCount; i++) {
        var begin = new _libPoint2['default'](sideStart.x + i * delta.x, sideStart.y + i * delta.y);
        var end = new _libPoint2['default'](matchingStart.x + i * matchingDelta.x, matchingStart.y + i * matchingDelta.y);
        var lineParams = MathHelper.getLineParams(begin.x, begin.y, end.x, end.y);
        var line = new _libLineEquation2['default'](lineParams, begin.x);
        lines.push(line);
      }
      return lines;
    }

    /**
     * Draw line from horizon to vanishing point
     * @private
     * @param  {LineEquation} side
     * @param  {LineEquation} oppositeSide
     * @param  {LineEquation} horizon
     * @param  {Point}        vanishingPoint
     * @return {Array<LineEquation>}
     */
  }, {
    key: '_getLines',
    value: function _getLines(side, oppositeSide, horizon, vanishingPoint) {

      // Project sides onto the horizon
      var projectedSide = side.intersect(horizon);
      var projectedOppositeSide = oppositeSide.intersect(horizon);

      if (projectedSide === null || projectedOppositeSide === null) {
        return;
      }

      var distance = new _libPoint2['default'](projectedOppositeSide.x - projectedSide.x, projectedOppositeSide.y - projectedSide.y);
      var dx = distance.x / this.gridUnitCount;
      var dy = distance.y / this.gridUnitCount;

      var results = [];

      for (var i = 0; i < this._lineCount; i++) {
        var startPoint = new _libPoint2['default'](projectedSide.x + i * dx, projectedSide.y + i * dy);
        var line = MathHelper.getLineParams(startPoint.x, startPoint.y, vanishingPoint.x, vanishingPoint.y);
        results.push(new _libLineEquation2['default'](line, startPoint.x));
      }
      return results;
    }

    /**
     * Get a line parallel to the horizon
     * @param  {Point} vVanishing
     * @param  {Point} hVanishing
     * @return {{m:number, c: number}}
     */
  }, {
    key: '_getHorizon',
    value: function _getHorizon(vVanishing, hVanishing) {

      // No horizon (eg. flat grid)
      // TODO: one point perspective
      if (vVanishing === null && hVanishing === null) {
        return null;
      } else if (vVanishing === null) {
        return null;
      } else if (hVanishing === null) {
        return null;
      }
      var horizon = MathHelper.getLineParams(vVanishing.x, vVanishing.y, hVanishing.x, hVanishing.y);

      var furthestFromHorizon = this._tl;
      var distanceToHorizon = MathHelper.getDistanceToLine(horizon, this._tl);

      [this._tr, this._bl, this._br].forEach(function (element) {
        var distance = MathHelper.getDistanceToLine(horizon, element);
        if (distance > distanceToHorizon) {
          distanceToHorizon = distance;
          furthestFromHorizon = element;
        }
      });

      return MathHelper.getParallelLine(horizon, furthestFromHorizon);
    }
  }]);

  return PerspectiveGrid;
})();

exports['default'] = PerspectiveGrid;
module.exports = exports['default'];

},{"./lib/LineEquation":1,"./lib/MathHelper":2,"./lib/Point":3,"./lib/Segment":4}]},{},[5])(5)
});