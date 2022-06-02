export interface IRenderCircle {
  renderCircle(radius: number): void;
}

export abstract class Renderer {
  render(fn: any): void {
    fn();
  }
}

export class VectorRenderer extends Renderer implements IRenderCircle {
  renderCircle(radius: number) {
    this.render(() => console.log(`Drawing a circle of radius ${radius}`));
  }
}

export class RasterRenderer extends Renderer implements IRenderCircle {
  renderCircle(radius: number) {
    this.render(() =>
      console.log(`Drawing pixels for circle of radius ${radius}`)
    );
  }
}

export class Shape {
  constructor(public renderer: IRenderCircle) {}
}

export class Circle extends Shape {
  constructor(public renderer: IRenderCircle, public radius: number) {
    super(renderer);
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor: number) {
    this.radius *= factor;
  }
}

// imagine Square, Triangle
// different ways of rendering: vector, raster
// we don't want a cartesian product of these

// Shape Hierarchy - Circle, Rectangle, Triangle...
// Render Hierarchy - Vector, Raster, ...
