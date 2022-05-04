import { describe, expect, it, vi } from 'vitest';
import { Circle, RasterRenderer, VectorRenderer } from './01_Bridge';

describe('Bridge', () => {
  it('should draw new raster circle', () => {
    const spy = vi.spyOn(console, 'log');
    const circle = new Circle(new RasterRenderer(), 5);
    circle.draw();
    expect(spy).toHaveBeenCalledWith('Drawing pixels for circle of radius 5');
  });

  it('should draw new vector circle', () => {
    const spy = vi.spyOn(console, 'log');
    const circle = new Circle(new VectorRenderer(), 5);
    circle.draw();
    expect(spy).toHaveBeenCalledWith('Drawing a circle of radius 5');
  });

  it('should render resized circle', () => {
    const spy = vi.spyOn(console, 'log');
    const circle = new Circle(new RasterRenderer(), 5);
    circle.resize(2);
    circle.draw();
    expect(spy).toHaveBeenCalledWith('Drawing pixels for circle of radius 10');
  })
});
