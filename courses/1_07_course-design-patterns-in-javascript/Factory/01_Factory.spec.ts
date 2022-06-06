import { describe, expect, it } from 'vitest';
import { roundDecimal } from '../utils/round-decimal.util';
import {
  CoordinateSystem,
  Point,
  PointFactory,
  PointSwitch,
} from './01_Factory';

describe('Factory', () => {
  describe('Point Factory', () => {
    it('should create a new cartesian point', () => {
      const point = PointFactory.newCartesianPoint(1, 2);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
    });

    it('should create a new polar point', () => {
      const point = PointFactory.newPolarPoint(1, 2);
      expect(roundDecimal(point.x, 2)).toBe(-0.42);
      expect(roundDecimal(point.y, 2)).toBe(0.91);
    });

    it('should create a new cartesian point from Point.factory', () => {
      const point = Point.factory.newCartesianPoint(1, 2);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
    });

    it('should create a new polar point from Point.factory', () => {
      const point = Point.factory.newPolarPoint(1, 2);
      expect(roundDecimal(point.x, 2)).toBe(-0.42);
      expect(roundDecimal(point.y, 2)).toBe(0.91);
    });
  });

  describe('Point Class', () => {
    it('should create default Point', () => {
      const point = new Point(0, 0);
      expect(point.x).toBe(0);
      expect(point.y).toBe(0);
    });

    it('should create a new cartesian point', () => {
      const point = Point.newCartesianPoint(1, 2);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
    });

    it('should create a new polar point', () => {
      const point = Point.newPolarPoint(1, 2);
      expect(roundDecimal(point.x, 2)).toBe(-0.42);
      expect(roundDecimal(point.y, 2)).toBe(0.91);
    });
  });

  describe('PointSwitch Class', () => {
    it('should create a point', () => {
      const point = new PointSwitch(1, 2);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
    });
    it('should create a polar point', () => {
      const point = new PointSwitch(1, 2, CoordinateSystem.Polar);
      expect(roundDecimal(point.x, 2)).toBe(-0.42);
      expect(roundDecimal(point.y, 2)).toBe(0.91);
    });
  });
});
