/**
 * @module Point
 */

/**
 * An object that defines a Point
 *
 * @alias module:Point
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Check if a point is in a list of points
   * @param  {Array.<Point>}  list Array of Points
   * @return {Boolean}
   */
  isInList(list) {
    for (var i = 0, len = list.length; i < len; i++) {
      if (this.x === list[i].x && this.y === list[i].y) {
        return true;
      }
    }
    return false;
  }
}

export default Point;
