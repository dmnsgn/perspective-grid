var PerspectiveGrid = require('./');
var Point = require('./lib/Point');

// Create canvas
var canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 400;
// canvas.width = canvas.height = 600;
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Instantiate the grid
var squares = [
  new Point(1, 1),
  new Point(1, 2),
  new Point(2, 2),
  new Point(3, 2),
  new Point(4, 2),
  new Point(4, 3),
  new Point(4, 4),
  new Point(4, 5),
  new Point(4, 6),
  new Point(5, 4),
  new Point(5, 5),
  new Point(5, 6),
  new Point(5, 7),
  new Point(6, 7),
  new Point(7, 7),
  new Point(8, 7),
  new Point(9, 7),
  new Point(10, 7),
  new Point(6, 8),
  new Point(6, 9),
  new Point(6, 10),
  new Point(7, 8)
];

window.grid = new PerspectiveGrid(ctx, 10, squares);
grid.init(
  new Point(140, 170),
  new Point(canvas.width - 140, 140),
  new Point(canvas.width, canvas.height),
  new Point(0, canvas.height)
);
// grid.init(
//   new Point(140, 140),
//   new Point(canvas.width - 140, 140),
//   new Point(canvas.width, canvas.height),
//   new Point(0, canvas.height)
// );

// grid.init(
//   new Point(0, 0),
//   new Point(canvas.width - 140, 140),
//   new Point(canvas.width - 140, canvas.height - 140),
//   new Point(0, canvas.height)
// );
grid.update();
grid.debug = true;

// Draw
ctx.save();
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'SALMON';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.restore();

ctx.save();
ctx.globalAlpha = 0.9;
ctx.strokeStyle = 'SEASHELL';
ctx.lineWidth = 1;

grid.drawLines();

ctx.restore();

ctx.save();
ctx.globalAlpha = 0.9;
ctx.fillStyle = 'MISTYROSE';

grid.drawSquares();

ctx.restore();
