# perspective-grid

[![npm version](https://img.shields.io/npm/v/perspective-grid)](https://www.npmjs.com/package/perspective-grid)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/perspective-grid)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/perspective-grid)](https://www.npmjs.com/package/perspective-grid)
[![dependencies](https://img.shields.io/david/dmnsgn/perspective-grid)](https://github.com/dmnsgn/perspective-grid/blob/main/package.json)
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
import PerspectiveGrid from "perspective-grid";
import canvasContext from "canvas-context";

const { context, canvas } = canvasContext("2d", {
  width: window.innerWidth,
  height: window.innerHeight,
});

const grid = new PerspectiveGrid(context, 10);
grid.init(
  new Point(300, 380),
  new Point(canvas.width - 300, 300),
  new Point(canvas.width, canvas.height),
  new Point(0, canvas.height)
);
grid.update();

// Operations on lines...
context.save();
grid.drawLines();
context.restore();

context.save();
grid.drawSquares();
context.restore();

// ...or simply draw
context.save();
grid.draw();
context.restore();
```

## API

<!-- api-start -->

Auto-generated API content.

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/perspective-grid/blob/main/LICENSE.md).
