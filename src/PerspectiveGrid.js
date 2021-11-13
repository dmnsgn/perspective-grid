/**
 * @module PerspectiveGrid
 */

import Point from "./Point.js";
import Segment from "./Segment.js";
import LineEquation from "./LineEquation.js";
import LineType from "./LineType.js";
import * as MathHelper from "./MathHelper.js";

/**
 * Two point perspective grid on canvas.
 *
 * Note: Does not work correctly when there is only one vanishing point.
 *
 * @alias module:PerspectiveGrid
 */
class PerspectiveGrid {
  /**
   * Creates an instance of PerspectiveGrid.
   * @param {number|Array<number>} units Number of rows and columns (unit or [rows, columns]).
   * @param {Array<Point>} [squares] Highlighted squares in the grid
   */
  constructor(units, squares) {
    [this.rows, this.columns] = Array.isArray(units) ? units : [units, units];
    this.squares = squares || [];
  }

  /**
   * Reset the corners (clockwise starting from top left)
   * @param {Point} tl Top left corner
   * @param {Point} tr Top right corner
   * @param {Point} br Bottom right corner
   * @param {Point} bl Bottom left corner
   */
  init(tl, tr, br, bl) {
    this._tl = tl;
    this._tr = tr;
    this._br = br;
    this._bl = bl;

    this.horizontal = [];
    this.vertical = [];

    const dy = (this._bl.y - this._tl.y) / this.rows;
    const dx = (this._tr.x - this._tl.x) / this.columns;

    for (let y = this._tl.y; y <= this._bl.y + MathHelper.EPSILON; y += dy) {
      this.horizontal[this.horizontal.length] = new Segment(
        new Point(this._tl.x, y),
        new Point(this._tr.x, y)
      );
    }

    for (let x = this._tl.x; x <= this._tr.x + MathHelper.EPSILON; x += dx) {
      this.vertical[this.vertical.length] = new Segment(
        new Point(x, this._tl.y),
        new Point(x, this._bl.y)
      );
    }
  }

  /**
   * Draw the grid in the instance context
   * @param {CanvasRenderingContext2D} context The context to draw the grid in
   */
  draw(context) {
    this.drawSquares(context);
    this.drawLines(context);
  }

  /**
   * Update grid segments
   */
  update() {
    // Get vanishing points and horizon
    const vVanishing = this._getVanishingEquation(
      MathHelper.getLineParams(this._tl.x, this._tl.y, this._bl.x, this._bl.y),
      MathHelper.getLineParams(this._tr.x, this._tr.y, this._br.x, this._br.y)
    );
    const hVanishing = this._getVanishingEquation(
      MathHelper.getLineParams(this._tl.x, this._tl.y, this._tr.x, this._tr.y),
      MathHelper.getLineParams(this._bl.x, this._bl.y, this._br.x, this._br.y)
    );

    let horizon = this._getHorizon(vVanishing, hVanishing);

    // Get border lines equations
    let topLine = MathHelper.getLineParams(
      this._tl.x,
      this._tl.y,
      this._tr.x,
      this._tr.y
    );
    let bottomLine = MathHelper.getLineParams(
      this._bl.x,
      this._bl.y,
      this._br.x,
      this._br.y
    );
    let leftLine = MathHelper.getLineParams(
      this._tl.x,
      this._tl.y,
      this._bl.x,
      this._bl.y
    );
    let rightLine = MathHelper.getLineParams(
      this._tr.x,
      this._tr.y,
      this._br.x,
      this._br.y
    );

    // Recalculate horizon
    if (horizon !== null) {
      horizon = new LineEquation(horizon, vVanishing.x);
    }

    // Recalculate lines
    topLine = new LineEquation(topLine, this._tl.x);
    bottomLine = new LineEquation(bottomLine, this._bl.x);
    leftLine = new LineEquation(leftLine, this._tl.x);
    rightLine = new LineEquation(rightLine, this._tr.x);

    let horizontal;
    let vertical;

    // Compute segment positions
    if (horizon === null) {
      horizontal = this._getEquidistantLines(
        LineType.HORIZONTAL,
        this._tl,
        this._bl,
        this._tr,
        this._br
      );
      vertical = this._getEquidistantLines(
        LineType.VERTICAL,
        this._tl,
        this._tr,
        this._bl,
        this._br
      );
    } else {
      horizontal = this._getLines(
        LineType.HORIZONTAL,
        topLine,
        bottomLine,
        horizon,
        hVanishing
      );
      vertical = this._getLines(
        LineType.VERTICAL,
        leftLine,
        rightLine,
        horizon,
        vVanishing
      );
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
  getQuadAt(column, row) {
    const p1 = this.horizontal[row - 1].intersect(this.vertical[column - 1]);
    const p2 = this.horizontal[row - 1].intersect(this.vertical[column]);
    const p3 = this.horizontal[row].intersect(this.vertical[column - 1]);
    const p4 = this.horizontal[row].intersect(this.vertical[column]);

    if (this.debug) {
      this.drawPoint(this.debug, p1, 4, "black");
      this.drawPoint(this.debug, p2, 4, "black");
      this.drawPoint(this.debug, p3, 4, "black");
      this.drawPoint(this.debug, p4, 4, "black");
    }

    return [p1, p2, p3, p4];
  }

  /**
   * Get the center point from grid unit to pixel eg. (1, 1) is the first top left point
   * @param  {number} column
   * @param  {number} row
   * @return {Point}
   */
  getCenterAt(column, row) {
    const center = MathHelper.getMassCenter.apply(
      null,
      this.getQuadAt(column, row)
    );

    if (this.debug) {
      this.drawPoint(this.debug, center, 4);
    }

    return center;
  }

  /**
   * Actually draw the lines (vertical and horizontal) in the context
   * @param {CanvasRenderingContext2D} context The context to draw the grid in
   */
  drawLines(context) {
    const segments = this.vertical.concat(this.horizontal);

    for (let i = 0; i < segments.length; i++) {
      context.beginPath();
      context.moveTo(segments[i].p1.x, segments[i].p1.y);
      context.lineTo(segments[i].p2.x, segments[i].p2.y);
      context.stroke();
      context.closePath();
    }
  }

  /**
   * Draw highlighted squares in the grid
   * @param {CanvasRenderingContext2D} context The context to draw the grid in
   */
  drawSquares(context) {
    const points = this.squares;

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (point.x > this.columns || point.y > this.rows) {
        throw new Error(`Point ${point.x}, ${point.x} is not in the grid.`);
      }

      const p1 = this.horizontal[point.y - 1].intersect(
        this.vertical[point.x - 1]
      );
      const p2 = this.horizontal[point.y - 1].intersect(this.vertical[point.x]);
      const p3 = this.horizontal[point.y].intersect(this.vertical[point.x - 1]);
      const p4 = this.horizontal[point.y].intersect(this.vertical[point.x]);

      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.lineTo(p4.x, p4.y);
      context.lineTo(p3.x, p3.y);
    }

    context.fill();
  }

  /**
   * Draw a single point in the grid useful for debug purpose
   * @param {CanvasRenderingContext2D} context The context to draw the grid in
   * @param {Point} point
   * @param {number} radius
   * @param {string} color
   */
  drawPoint(context, point, radius, color) {
    context.save();
    context.beginPath();
    context.arc(
      point.x - radius / 2,
      point.y - radius / 2,
      radius,
      0,
      MathHelper.TWO_PI,
      false
    );
    context.fillStyle = color || "grey";
    context.fill();
    context.restore();
  }

  /**
   * Update lines (vertical and horizontal) equations
   * @private
   * @param {LineEquation} side
   * @param {LineEquation} oppositeSide
   * @param {Array<LineEquation>} lineEquations
   * @param {Segment} segments
   */
  _updateLines(side, oppositeSide, lineEquations, segments) {
    for (let i = 0; i < lineEquations.length; i++) {
      const line = lineEquations[i];
      const begin = side.intersect(line);
      const end = oppositeSide.intersect(line);

      if (begin === null || end === null) {
        continue;
      }

      segments[i].p1.x = ~~begin.x;
      segments[i].p1.y = ~~begin.y;
      segments[i].p2.x = ~~end.x;
      segments[i].p2.y = ~~end.y;
    }
  }

  /**
   * Find the convergence point of two lines
   * @private
   */
  _getVanishingEquation(side, oppositeSide) {
    let vanishing;

    if (side === null && oppositeSide === null) {
      vanishing = null;
    } else if (side === null) {
      vanishing = new Point(
        this._tl.x,
        MathHelper.getVerticalConvergence(
          this._tl.x,
          oppositeSide.m,
          oppositeSide.c
        )
      );
    } else if (oppositeSide === null) {
      vanishing = new Point(
        this._tr.x,
        MathHelper.getVerticalConvergence(this._tr.x, side.m, side.c)
      );
    } else {
      vanishing = MathHelper.getConvergencePoint(
        side.m,
        side.c,
        oppositeSide.m,
        oppositeSide.c
      );
    }

    return vanishing;
  }

  /**
   * Get line equations for equidistant lines
   * @private
   */
  _getEquidistantLines(
    lineType,
    sideStart,
    sideEnd,
    matchingStart,
    matchingEnd
  ) {
    let lines = [];

    const units = lineType === LineType.HORIZONTAL ? this.rows : this.columns;

    const delta = new Point(
      (sideEnd.x - sideStart.x) / units,
      (sideEnd.y - sideStart.y) / units
    );
    const matchingDelta = new Point(
      (matchingEnd.x - matchingStart.x) / units,
      (matchingEnd.y - matchingStart.y) / units
    );

    for (let i = 0; i <= units; i++) {
      const begin = new Point(
        sideStart.x + i * delta.x,
        sideStart.y + i * delta.y
      );
      const end = new Point(
        matchingStart.x + i * matchingDelta.x,
        matchingStart.y + i * matchingDelta.y
      );
      const lineParams = MathHelper.getLineParams(
        begin.x,
        begin.y,
        end.x,
        end.y
      );
      const line = new LineEquation(lineParams, begin.x);
      lines.push(line);
    }
    return lines;
  }

  /**
   * Draw line from horizon to vanishing point
   * @private
   * @param  {LineType} lineType
   * @param  {LineEquation} side
   * @param  {LineEquation} oppositeSide
   * @param  {LineEquation} horizon
   * @param  {Point} vanishingPoint
   * @return {Array<LineEquation>}
   */
  _getLines(lineType, side, oppositeSide, horizon, vanishingPoint) {
    // Project sides onto the horizon
    const projectedSide = side.intersect(horizon);
    const projectedOppositeSide = oppositeSide.intersect(horizon);

    if (projectedSide === null || projectedOppositeSide === null) {
      return;
    }

    const distance = new Point(
      projectedOppositeSide.x - projectedSide.x,
      projectedOppositeSide.y - projectedSide.y
    );

    const units = lineType === LineType.HORIZONTAL ? this.rows : this.columns;

    const dx = distance.x / units;
    const dy = distance.y / units;

    let results = [];

    for (let i = 0; i <= units; i++) {
      const startPoint = new Point(
        projectedSide.x + i * dx,
        projectedSide.y + i * dy
      );
      const line = MathHelper.getLineParams(
        startPoint.x,
        startPoint.y,
        vanishingPoint.x,
        vanishingPoint.y
      );
      results.push(new LineEquation(line, startPoint.x));
    }
    return results;
  }

  /**
   * Get a line parallel to the horizon
   * @param  {Point} vVanishing
   * @param  {Point} hVanishing
   * @return {{m:number, c: number}}
   */
  _getHorizon(vVanishing, hVanishing) {
    // No horizon (eg. flat grid)
    // TODO: one point perspective
    if (vVanishing === null && hVanishing === null) {
      return null;
    } else if (vVanishing === null) {
      return null;
    } else if (hVanishing === null) {
      return null;
    }
    const horizon = MathHelper.getLineParams(
      vVanishing.x,
      vVanishing.y,
      hVanishing.x,
      hVanishing.y
    );

    let furthestFromHorizon = this._tl;
    let distanceToHorizon = MathHelper.getDistanceToLine(horizon, this._tl);

    [this._tr, this._bl, this._br].forEach(function (element) {
      const distance = MathHelper.getDistanceToLine(horizon, element);
      if (distance > distanceToHorizon) {
        distanceToHorizon = distance;
        furthestFromHorizon = element;
      }
    });

    return MathHelper.getParallelLine(horizon, furthestFromHorizon);
  }
}

export default PerspectiveGrid;
