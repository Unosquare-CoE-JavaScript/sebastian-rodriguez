import { describe, expect, it } from 'vitest';
import { Circle, ColoredShape, Square, TransparentShape } from './01_Decorator';

describe('Decorator', () => {
  it('should intantiate a new circle', () => {
    const circle = new Circle();
    expect(circle.radius).toBe(0);
  });

  it('should resize a circle', () => {
    const circle = new Circle(2);
    circle.resize(2);
    expect(circle.radius).toBe(4);
  });

  it('should intanciate a new square', () => {
    const square = new Square(10);
    expect(square.side).toBe(10);
  });

  it('should color a shape', () => {
    const coloredShape = new ColoredShape(new Circle(), 'red');
    expect(coloredShape.color).toBe('red');
    const coloredShape2 = new ColoredShape(new Square(10), 'blue');
    expect(coloredShape2.color).toBe('blue');
  });

  it('should make a shape transparent', () => {
    const transparentShape = new TransparentShape(new Circle(), 0.5);
    expect(transparentShape.transparency).toBe(0.5);
    const transparentShape2 = new TransparentShape(new Square(10), 0.2);
    expect(transparentShape2.transparency).toBe(0.2);
  });
});
