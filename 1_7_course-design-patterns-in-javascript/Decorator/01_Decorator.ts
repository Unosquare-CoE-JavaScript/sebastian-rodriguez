export abstract class Shape {}

export class Circle extends Shape {
  constructor(public radius = 0) {
    super();
  }

  resize(factor: number) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

export class Square extends Shape {
  constructor(public side = 0) {
    super();
  }

  toString() {
    return `A square with side ${this.side}`;
  }
}

// we don't want ColoredSquare, ColoredCircle, etc.
export class ColoredShape extends Shape {
  constructor(public shape: Shape, public color: string) {
    super();
  }

  toString() {
    return `${this.shape.toString()} ` + `has the color ${this.color}`;
  }
}

export class TransparentShape extends Shape {
  constructor(public shape: Shape, public transparency: number) {
    super();
  }

  toString() {
    return (
      `${this.shape.toString()} has ` +
      `${this.transparency * 100.0}% transparency`
    );
  }
}
