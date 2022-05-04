import { beforeEach, describe, expect, it } from 'vitest';
import logger from '../utils/logger.util';
import {
  AndSpecification,
  BetterFilter,
  Color,
  ColorSpecification,
  Product,
  ProductFilter,
  Size,
  SizeSpecification,
} from './02_OpenClose';

describe('OpenClose', () => {
  describe('Product', () => {
    let apple: Product;

    beforeEach(() => {
      apple = new Product('Apple', Color.Green, Size.Small);
    });
    it('should be instantiate', () => {
      expect(apple).toBeDefined();
    });
  });

  describe('ProductFilter', () => {
    let products: Product[];

    beforeEach(() => {
      logger.success('Creating products');
      products = [
        new Product('Apple', Color.Green, Size.Small),
        new Product('Tree', Color.Green, Size.Large),
        new Product('House', Color.Blue, Size.Large),
        new Product('Flower', Color.Green, Size.Medium),
      ];
      logger.success('Products created');
    });

    it('should filter by color', () => {
      const result = ProductFilter.filterByColor(products, Color.Green);
      expect(result.length).toBe(3);
    });

    it('should filter by size', () => {
      const result = ProductFilter.filterBySize(products, Size.Small);
      expect(result.length).toBe(1);
    });

    it('should filter by size and color', () => {
      const result = ProductFilter.filterBySizeAndColor(
        products,
        Size.Small,
        Color.Green
      );
      expect(result.length).toBe(1);
    });
  });

  describe('ColorSpecification', () => {
    let apple: Product;

    beforeEach(() => {
      apple = new Product('Apple', Color.Green, Size.Small);
    });

    it('should be instantiate', () => {
      expect(apple).toBeDefined();
    });

    it('should color be satisfied', () => {
      const greenApple = new ColorSpecification(Color.Green);
      expect(greenApple.isSatisfied(apple)).toBe(true);
    });

    it('should color not be satisfied', () => {
      const redApple = new ColorSpecification(Color.Red);
      expect(redApple.isSatisfied(apple)).toBe(false);
    });

    it('should size be satisfied', () => {
      const smallApple = new SizeSpecification(Size.Small);
      expect(smallApple.isSatisfied(apple)).toBe(true);
    });
  });

  describe('BetterFilter', () => {
    let products: Product[];

    beforeEach(() => {
      logger.success('Creating products');
      products = [
        new Product('Apple', Color.Green, Size.Small),
        new Product('Tree', Color.Green, Size.Large),
        new Product('House', Color.Blue, Size.Large),
        new Product('Flower', Color.Green, Size.Medium),
      ];
      logger.success('Products created');
    });

    it('should filter by color', () => {
      const result = BetterFilter.filter(
        products,
        new ColorSpecification(Color.Green)
      );
      expect(result.length).toBe(3);
    });
  });

  describe('AndSpecification', () => {
    let apple: Product;

    beforeEach(() => {
      apple = new Product('Apple', Color.Green, Size.Small);
    });

    it('should be instantiate', () => {
      expect(apple).toBeDefined();
    });

    it('should color and size be satisfied', () => {
      const greenApple = new ColorSpecification(Color.Green);
      const smallApple = new SizeSpecification(Size.Small);
      const greenSmallApple = new AndSpecification(greenApple, smallApple);
      expect(greenSmallApple.isSatisfied(apple)).toBe(true);
    });

    it('should color and size not be satisfied', () => {
      // greenSmallApple
      const greenApple = new ColorSpecification(Color.Green);
      const largeApple = new SizeSpecification(Size.Large);

      const greenLargeApple = new AndSpecification(greenApple, largeApple);

      expect(greenLargeApple.isSatisfied(apple)).toBe(false);
    });
  });
});
