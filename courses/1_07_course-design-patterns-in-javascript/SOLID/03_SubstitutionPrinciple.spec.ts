import { describe, expect, it } from 'vitest';
import { Rectangle, Square } from './03_SubstitutionPrinciple';

describe('Substitution Principle', () => {
  describe('Rectangle', () => {
    it('should be instantiate', () => {
      const rect = new Rectangle(10, 20);
      expect(rect).toBeDefined();
    });

    it('should have area', () => {
      const rect = new Rectangle(10, 20);
      expect(rect.area).toBe(200);
    });
  });

  describe('Square', () => {
    it('should be instantiate', () => {
      const square = new Square(10);
      expect(square).toBeDefined();
    });

    it('should have area', () => {
      const square = new Square(10);
      expect(square.area).toBe(100);
    });
  });
});
