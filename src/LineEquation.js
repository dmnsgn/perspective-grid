/**
 * @module LineEquation
 */

import Point from "./Point.js";
import { getConvergencePoint, getVerticalConvergence } from "./MathHelper.js";

/**
 * LineEquation defines a line equation or vertical
 *
 * @alias module:LineEquation
 * @param {LineParams} lineParams Line parameters
 * @param {number} x X position
 */
class LineEquation {
  constructor(lineParams, x) {
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
   * @returns {Point}
   */
  intersect(equation) {
    if (this.vertical && equation.vertical) {
      return null;
    }

    if (this.vertical) {
      return new Point(
        this.x,
        getVerticalConvergence(this.x, equation.m, equation.c),
      );
    }

    if (equation.vertical) {
      return new Point(
        equation.x,
        getVerticalConvergence(equation.x, this.m, this.c),
      );
    }

    return getConvergencePoint(this.m, this.c, equation.m, equation.c);
  }
}

export default LineEquation;
