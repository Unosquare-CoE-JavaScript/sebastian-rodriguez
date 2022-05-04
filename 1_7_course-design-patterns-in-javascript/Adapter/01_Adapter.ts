export class Point {
  constructor(public x: number, public y: number) {}

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

export class Line {
  constructor(public start: Point, public end: Point) {}

  toString() {
    return `${this.start.toString()}→${this.end.toString()}`;
  }
}

export class VectorObject extends Array {}

export class VectorRectangle extends VectorObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super();
    this.push(new Line(new Point(x, y), new Point(x + width, y)));
    this.push(
      new Line(new Point(x + width, y), new Point(x + width, y + height))
    );
    this.push(new Line(new Point(x, y), new Point(x, y + height)));
    this.push(
      new Line(new Point(x, y + height), new Point(x + width, y + height))
    );
    this.push;
  }
}

// ↑↑↑ this is your API ↑↑↑

// ↓↓↓ this is what you have to work with ↓↓↓

// let vectorObjects = [
//   new VectorRectangle(1, 1, 10, 10),
//   new VectorRectangle(3, 3, 6, 6),
// ];

let drawPoint = function (point: Point) {
  process.stdout.write('.');
};

// ↓↓↓ to draw our vector objects, we need an adapter ↓↓↓

export class LineToPointAdapter extends Array {
  static count = 0;
  constructor(public line: any) {
    super();
    console.log(
      `${LineToPointAdapter.count++}: Generating ` +
        `points for line ${line.toString()} (no caching)`
    );

    let left = Math.min(line.start.x, line.end.x);
    let right = Math.max(line.start.x, line.end.x);
    let top = Math.min(line.start.y, line.end.y);
    let bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0) {
      for (let y = top; y <= bottom; ++y) {
        this.push(new Point(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        this.push(new Point(x, top));
      }
    }
  }
}
LineToPointAdapter.count = 0;

export const drawPoints = (vecObjs: VectorObject[]) => {
  for (let vo of vecObjs)
    for (let line of vo) {
      let adapter = new LineToPointAdapter(line);
      adapter.forEach(drawPoint);
    }
};
