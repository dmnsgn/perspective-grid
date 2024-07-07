# perspective-grid

[![npm version](https://img.shields.io/npm/v/perspective-grid)](https://www.npmjs.com/package/perspective-grid)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/perspective-grid)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/perspective-grid)](https://bundlephobia.com/package/perspective-grid)
[![dependencies](https://img.shields.io/librariesio/release/npm/perspective-grid)](https://github.com/dmnsgn/perspective-grid/blob/main/package.json)
[![types](https://img.shields.io/npm/types/perspective-grid)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/perspective-grid)](https://github.com/dmnsgn/perspective-grid/blob/main/LICENSE.md)

Two point perspective grid on canvas.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/perspective-grid/main/screenshot.gif)

## Installation

```bash
npm install perspective-grid
```

## Usage

```js
import { PerspectiveGrid, Point } from "perspective-grid";
import canvasContext from "canvas-context";

const { context, canvas } = canvasContext("2d", {
  width: window.innerWidth,
  height: window.innerHeight,
});

// Alternatively pass [rows, columns] for a grid with different rows and column units
const grid = new PerspectiveGrid(10);

grid.init(
  new Point(300, 380),
  new Point(canvas.width - 300, 300),
  new Point(canvas.width, canvas.height),
  new Point(0, canvas.height)
);
grid.update();

// Operations on lines...
context.save();
grid.drawLines(context);
context.restore();

context.save();
grid.drawSquares(context);
context.restore();

// ...or simply draw
context.save();
grid.draw(context);
context.restore();
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_LineEquation">LineEquation</a></dt>
<dd></dd>
<dt><a href="#module_LineType">LineType</a></dt>
<dd></dd>
<dt><a href="#module_MathHelper">MathHelper</a></dt>
<dd></dd>
<dt><a href="#module_PerspectiveGrid">PerspectiveGrid</a></dt>
<dd></dd>
<dt><a href="#module_Point">Point</a></dt>
<dd></dd>
<dt><a href="#module_Segment">Segment</a></dt>
<dd></dd>
</dl>

<a name="module_LineEquation"></a>

## LineEquation

- [LineEquation](#module_LineEquation)
  - [LineEquation](#exp_module_LineEquation--LineEquation) ⏏
    - [new LineEquation(lineParams, x)](#new_module_LineEquation--LineEquation_new)
    - [.intersect(equation)](#module_LineEquation--LineEquation+intersect) ⇒ <code>Point</code>

<a name="exp_module_LineEquation--LineEquation"></a>

### LineEquation ⏏

LineEquation defines a line equation or vertical

**Kind**: Exported class
<a name="new_module_LineEquation--LineEquation_new"></a>

#### new LineEquation(lineParams, x)

| Param      | Type                    | Description     |
| ---------- | ----------------------- | --------------- |
| lineParams | <code>LineParams</code> | Line parameters |
| x          | <code>number</code>     | X position      |

<a name="module_LineEquation--LineEquation+intersect"></a>

#### lineEquation.intersect(equation) ⇒ <code>Point</code>

Get intersection of two line equation

**Kind**: instance method of [<code>LineEquation</code>](#exp_module_LineEquation--LineEquation)

| Param    | Type                      |
| -------- | ------------------------- |
| equation | <code>LineEquation</code> |

<a name="module_LineType"></a>

## LineType

<a name="exp_module_LineType--LineType"></a>

### LineType ⏏

A faked ENUM for referencing line types.

**Kind**: Exported constant

| Param      | Type                |
| ---------- | ------------------- |
| VERTICAL   | <code>number</code> |
| HORIZONTAL | <code>number</code> |

<a name="module_MathHelper"></a>

## MathHelper

- [MathHelper](#module_MathHelper)
  - [.EPSILON](#module_MathHelper.EPSILON) : <code>number</code>
  - [.PI](#module_MathHelper.PI) : <code>number</code>
  - [.TWO_PI](#module_MathHelper.TWO_PI) : <code>number</code>
  - [.getDistance(point1, point2)](#module_MathHelper.getDistance) ⇒ <code>number</code>
  - [.getConvergencePoint(m1, c1, m2, c2)](#module_MathHelper.getConvergencePoint) ⇒ <code>Point</code>
  - [.getVerticalConvergence(x, m, c)](#module_MathHelper.getVerticalConvergence) ⇒ <code>number</code>
  - [.getLineParams(x1, y1, x2, y2)](#module_MathHelper.getLineParams) ⇒ <code>Object</code>
  - [.getParallelLine(line, point)](#module_MathHelper.getParallelLine) ⇒ <code>Object</code>
  - [.getDistanceToLine(line, point)](#module_MathHelper.getDistanceToLine) ⇒ <code>number</code>
  - [.getProjectedPoint(line, point)](#module_MathHelper.getProjectedPoint) ⇒ <code>Point</code>
  - [.getMassCenter(p1, p2, p3, p4)](#module_MathHelper.getMassCenter) ⇒ <code>Point</code>

<a name="module_MathHelper.EPSILON"></a>

### MathHelper.EPSILON : <code>number</code>

**Kind**: static constant of [<code>MathHelper</code>](#module_MathHelper)
<a name="module_MathHelper.PI"></a>

### MathHelper.PI : <code>number</code>

**Kind**: static constant of [<code>MathHelper</code>](#module_MathHelper)
<a name="module_MathHelper.TWO_PI"></a>

### MathHelper.TWO_PI : <code>number</code>

**Kind**: static constant of [<code>MathHelper</code>](#module_MathHelper)
<a name="module_MathHelper.getDistance"></a>

### MathHelper.getDistance(point1, point2) ⇒ <code>number</code>

Get the distance between two points

**Kind**: static method of [<code>MathHelper</code>](#module_MathHelper)
**Returns**: <code>number</code> - Distance between point1 and point2

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| point1 | <code>Object</code> | First point  |
| point2 | <code>Object</code> | Second point |

<a name="module_MathHelper.getConvergencePoint"></a>

### MathHelper.getConvergencePoint(m1, c1, m2, c2) ⇒ <code>Point</code>

Get the convergence point of two line equation

**Kind**: static method of [<code>MathHelper</code>](#module_MathHelper)

| Param | Type                |
| ----- | ------------------- |
| m1    | <code>number</code> |
| c1    | <code>number</code> |
| m2    | <code>number</code> |
| c2    | <code>number</code> |

<a name="module_MathHelper.getVerticalConvergence"></a>

### MathHelper.getVerticalConvergence(x, m, c) ⇒ <code>number</code>

Get the vertical convergence point from a X position

**Kind**: static method of [<code>MathHelper</code>](#module_MathHelper)

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| m     | <code>number</code> |
| c     | <code>number</code> |

<a name="module_MathHelper.getLineParams"></a>

### MathHelper.getLineParams(x1, y1, x2, y2) ⇒ <code>Object</code>

Return line parameters

**Kind**: static method of [<code>MathHelper</code>](#module_MathHelper)

| Param | Type                |
| ----- | ------------------- |
| x1    | <code>number</code> |
| y1    | <code>number</code> |
| x2    | <code>number</code> |
| y2    | <code>number</code> |

<a name="module_MathHelper.getParallelLine"></a>

### MathHelper.getParallelLine(line, point) ⇒ <code>Object</code>

Get parallel line parameters

**Kind**: static method of [<code>MathHelper</code>](#module_MathHelper)

| Param | Type                |
| ----- | ------------------- |
| line  | <code>number</code> |
| point | <code>Point</code>  |

<a name="module_MathHelper.getDistanceToLine"></a>

### MathHelper.getDistanceToLine(line, point) ⇒ <code>number</code>

Get the distance to a line parameters

**Kind**: static method of [<code>MathHelper</code>](#module_MathHelper)

| Param | Type                |
| ----- | ------------------- |
| line  | <code>Object</code> |
| point | <code>Point</code>  |

<a name="module_MathHelper.getProjectedPoint"></a>

### MathHelper.getProjectedPoint(line, point) ⇒ <code>Point</code>

Get a projected point

**Kind**: static method of [<code>MathHelper</code>](#module_MathHelper)

| Param | Type                |
| ----- | ------------------- |
| line  | <code>Object</code> |
| point | <code>Point</code>  |

<a name="module_MathHelper.getMassCenter"></a>

### MathHelper.getMassCenter(p1, p2, p3, p4) ⇒ <code>Point</code>

Get the center of four points

**Kind**: static method of [<code>MathHelper</code>](#module_MathHelper)

| Param | Type               |
| ----- | ------------------ |
| p1    | <code>Point</code> |
| p2    | <code>Point</code> |
| p3    | <code>Point</code> |
| p4    | <code>Point</code> |

<a name="module_PerspectiveGrid"></a>

## PerspectiveGrid

- [PerspectiveGrid](#module_PerspectiveGrid)
  - [PerspectiveGrid](#exp_module_PerspectiveGrid--PerspectiveGrid) ⏏
    - [new PerspectiveGrid(units, [squares])](#new_module_PerspectiveGrid--PerspectiveGrid_new)
    - [.init(tl, tr, br, bl)](#module_PerspectiveGrid--PerspectiveGrid+init)
    - [.draw(context)](#module_PerspectiveGrid--PerspectiveGrid+draw)
    - [.update()](#module_PerspectiveGrid--PerspectiveGrid+update)
    - [.getQuadAt(column, row)](#module_PerspectiveGrid--PerspectiveGrid+getQuadAt) ⇒ <code>Array.&lt;Point&gt;</code>
    - [.getCenterAt(column, row)](#module_PerspectiveGrid--PerspectiveGrid+getCenterAt) ⇒ <code>Point</code>
    - [.drawLines(context)](#module_PerspectiveGrid--PerspectiveGrid+drawLines)
    - [.drawSquares(context)](#module_PerspectiveGrid--PerspectiveGrid+drawSquares)
    - [.drawPoint(context, point, radius, color)](#module_PerspectiveGrid--PerspectiveGrid+drawPoint)
    - [.\_getHorizon(vVanishing, hVanishing)](#module_PerspectiveGrid--PerspectiveGrid+_getHorizon) ⇒ <code>Object</code>

<a name="exp_module_PerspectiveGrid--PerspectiveGrid"></a>

### PerspectiveGrid ⏏

Two point perspective grid on canvas.

Note: Does not work correctly when there is only one vanishing point.

**Kind**: Exported class
<a name="new_module_PerspectiveGrid--PerspectiveGrid_new"></a>

#### new PerspectiveGrid(units, [squares])

Creates an instance of PerspectiveGrid.

| Param     | Type                                                     | Description                                           |
| --------- | -------------------------------------------------------- | ----------------------------------------------------- |
| units     | <code>number</code> \| <code>Array.&lt;number&gt;</code> | Number of rows and columns (unit or [rows, columns]). |
| [squares] | <code>Array.&lt;Point&gt;</code>                         | Highlighted squares in the grid                       |

<a name="module_PerspectiveGrid--PerspectiveGrid+init"></a>

#### perspectiveGrid.init(tl, tr, br, bl)

Reset the corners (clockwise starting from top left)

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)

| Param | Type               | Description         |
| ----- | ------------------ | ------------------- |
| tl    | <code>Point</code> | Top left corner     |
| tr    | <code>Point</code> | Top right corner    |
| br    | <code>Point</code> | Bottom right corner |
| bl    | <code>Point</code> | Bottom left corner  |

<a name="module_PerspectiveGrid--PerspectiveGrid+draw"></a>

#### perspectiveGrid.draw(context)

Draw the grid in the instance context

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)

| Param   | Type                                  | Description                     |
| ------- | ------------------------------------- | ------------------------------- |
| context | <code>CanvasRenderingContext2D</code> | The context to draw the grid in |

<a name="module_PerspectiveGrid--PerspectiveGrid+update"></a>

#### perspectiveGrid.update()

Update grid segments

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)
<a name="module_PerspectiveGrid--PerspectiveGrid+getQuadAt"></a>

#### perspectiveGrid.getQuadAt(column, row) ⇒ <code>Array.&lt;Point&gt;</code>

Get the four vertices of a point in grid

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)

| Param  | Type                |
| ------ | ------------------- |
| column | <code>number</code> |
| row    | <code>number</code> |

<a name="module_PerspectiveGrid--PerspectiveGrid+getCenterAt"></a>

#### perspectiveGrid.getCenterAt(column, row) ⇒ <code>Point</code>

Get the center point from grid unit to pixel eg. (1, 1) is the first top left point

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)

| Param  | Type                |
| ------ | ------------------- |
| column | <code>number</code> |
| row    | <code>number</code> |

<a name="module_PerspectiveGrid--PerspectiveGrid+drawLines"></a>

#### perspectiveGrid.drawLines(context)

Actually draw the lines (vertical and horizontal) in the context

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)

| Param   | Type                                  | Description                     |
| ------- | ------------------------------------- | ------------------------------- |
| context | <code>CanvasRenderingContext2D</code> | The context to draw the grid in |

<a name="module_PerspectiveGrid--PerspectiveGrid+drawSquares"></a>

#### perspectiveGrid.drawSquares(context)

Draw highlighted squares in the grid

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)

| Param   | Type                                  | Description                     |
| ------- | ------------------------------------- | ------------------------------- |
| context | <code>CanvasRenderingContext2D</code> | The context to draw the grid in |

<a name="module_PerspectiveGrid--PerspectiveGrid+drawPoint"></a>

#### perspectiveGrid.drawPoint(context, point, radius, color)

Draw a single point in the grid useful for debug purpose

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)

| Param   | Type                                  | Description                     |
| ------- | ------------------------------------- | ------------------------------- |
| context | <code>CanvasRenderingContext2D</code> | The context to draw the grid in |
| point   | <code>Point</code>                    |                                 |
| radius  | <code>number</code>                   |                                 |
| color   | <code>string</code>                   |                                 |

<a name="module_PerspectiveGrid--PerspectiveGrid+_getHorizon"></a>

#### perspectiveGrid.\_getHorizon(vVanishing, hVanishing) ⇒ <code>Object</code>

Get a line parallel to the horizon

**Kind**: instance method of [<code>PerspectiveGrid</code>](#exp_module_PerspectiveGrid--PerspectiveGrid)

| Param      | Type               |
| ---------- | ------------------ |
| vVanishing | <code>Point</code> |
| hVanishing | <code>Point</code> |

<a name="module_Point"></a>

## Point

- [Point](#module_Point)
  - [Point](#exp_module_Point--Point) ⏏
    - [new Point(x, y)](#new_module_Point--Point_new)
    - [.isInList(list)](#module_Point--Point+isInList) ⇒ <code>boolean</code>

<a name="exp_module_Point--Point"></a>

### Point ⏏

An object that defines a Point

**Kind**: Exported class
<a name="new_module_Point--Point_new"></a>

#### new Point(x, y)

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| x     | <code>number</code> | x coordinate |
| y     | <code>number</code> | y coordinate |

<a name="module_Point--Point+isInList"></a>

#### point.isInList(list) ⇒ <code>boolean</code>

Check if a point is in a list of points

**Kind**: instance method of [<code>Point</code>](#exp_module_Point--Point)

| Param | Type                             | Description     |
| ----- | -------------------------------- | --------------- |
| list  | <code>Array.&lt;Point&gt;</code> | Array of Points |

<a name="module_Segment"></a>

## Segment

- [Segment](#module_Segment)
  - [Segment](#exp_module_Segment--Segment) ⏏
    - [new Segment(p1, p1)](#new_module_Segment--Segment_new)
    - [.intersect(segment)](#module_Segment--Segment+intersect) ⇒ <code>Point</code>

<a name="exp_module_Segment--Segment"></a>

### Segment ⏏

An object with two points that defines a segment

**Kind**: Exported class
<a name="new_module_Segment--Segment_new"></a>

#### new Segment(p1, p1)

| Param | Type               | Description  |
| ----- | ------------------ | ------------ |
| p1    | <code>Point</code> | First point  |
| p1    | <code>Point</code> | Second point |

<a name="module_Segment--Segment+intersect"></a>

#### segment.intersect(segment) ⇒ <code>Point</code>

Get intersection of two segments

**Kind**: instance method of [<code>Segment</code>](#exp_module_Segment--Segment)

| Param   | Type                 |
| ------- | -------------------- |
| segment | <code>Segment</code> |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/perspective-grid/blob/main/LICENSE.md).
