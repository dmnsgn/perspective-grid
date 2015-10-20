/**
 * @file Defines a segment between two points
 * @author Damien Seguin
 */

'use strict';

import LineEquation from './LineEquation';
import { getLineParams } from './MathHelper';

/**
 * An object with two points that defines a segment
 * @param {Point} p1 First point
 * @param {Point} p1 Second point
 * @constructor
 */
export default class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  /**
   * Get intersection of two segments
   * @param  {Segment} segment
   * @return {Point}
   */
  intersect(segment) {
    const line1 = new LineEquation(
      getLineParams(this.p1.x, this.p1.y, this.p2.x, this.p2.y),
      this.p1.x
    );
    const line2 = new LineEquation(
      getLineParams(segment.p1.x, segment.p1.y, segment.p2.x, segment.p2.y),
      segment.p1.x
    );

    return line1.intersect(line2);
  };
}
