/**
 * @module MathHelper
 */

import Point from "./Point.js";

/** @constant {number} */
export const EPSILON = 0.0001;

/** @constant {number} */
export const PI = Math.PI;

/** @constant {number} */
export const TWO_PI = PI * 2;

/**
 * Get the distance between two points
 * @param {{x: number, y: number}} point1 First point
 * @param {{x: number, y: number}} point2 Second point
 * @returns {number}    Distance between point1 and point2
 */
export function getDistance(point1, point2) {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2),
  );
}

/**
 * Get the convergence point of two line equation
 * @param  {number} m1
 * @param  {number} c1
 * @param  {number} m2
 * @param  {number} c2
 * @returns {Point}
 */
export function getConvergencePoint(m1, c1, m2, c2) {
  if (Math.abs(m1 - m2) < EPSILON) {
    return null;
  }

  const point = new Point();
  point.x = (c2 - c1) / (m1 - m2);
  point.y = point.x * m1 + c1;

  return point;
}

/**
 * Get the vertical convergence point from a X position
 * @param  {number} x
 * @param  {number} m
 * @param  {number} c
 * @returns {number}
 */
export function getVerticalConvergence(x, m, c) {
  return m * x + c;
}

/**
 * Return line parameters
 * @param  {number} x1
 * @param  {number} y1
 * @param  {number} x2
 * @param  {number} y2
 * @returns {{m:number, c: number}}
 */
export function getLineParams(x1, y1, x2, y2) {
  const dx = x1 - x2;

  if (Math.abs(dx) < EPSILON) {
    return null;
  }

  const m = (y1 - y2) / dx;
  const c = y1 - m * x1;

  return {
    m: m,
    c: c,
  };
}

/**
 * Get parallel line parameters
 * @param  {number} line
 * @param  {Point} point
 * @returns {{m:number, c: number}}
 */
export function getParallelLine(line, point) {
  const c = point.y - line.m * point.x;

  return {
    m: line.m,
    c: c,
  };
}

/**
 * Get the distance to a line parameters
 * @param  {{m:number, c: number}} line
 * @param  {Point} point
 * @returns {number}
 */
export function getDistanceToLine(line, point) {
  return getDistance(point, getProjectedPoint(line, point));
}

/**
 * Get a projected point
 * @param  {{m:number, c: number}} line
 * @param  {Point} point
 * @returns {Point}
 */
export function getProjectedPoint(line, point) {
  const perpendicularm = -1 / line.m;
  const perpendicularc = point.y - perpendicularm * point.x;
  const x = (line.c - perpendicularc) / (perpendicularm - line.m);
  const y = line.m * x + line.c;

  return new Point(x, y);
}

/**
 * Get the center of four points
 * @param  {Point} p1
 * @param  {Point} p2
 * @param  {Point} p3
 * @param  {Point} p4
 * @returns {Point}
 */
export function getMassCenter(p1, p2, p3, p4) {
  return new Point(
    (p1.x + p2.x + p3.x + p4.x) / 4,
    (p1.y + p2.y + p3.y + p4.y) / 4,
  );
}
