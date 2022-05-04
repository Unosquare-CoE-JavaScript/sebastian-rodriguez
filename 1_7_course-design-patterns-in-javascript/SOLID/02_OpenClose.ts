enum Color {
  Red,
  Green,
  Blue,
}

enum Size {
  Small,
  Medium,
  Large,
}

class Product {
  constructor(public name: string, public color: Color, public size: Size) {}
}

// Open for extension, closed for modification

class ProductFilter {
  static filterByColor = (products: Product[], color: Color): Product[] =>
    products.filter((p: Product) => p.color === color);

  static filterBySize = (products: Product[], size: Size): Product[] =>
    products.filter((p: Product) => p.size === size);

  static filterBySizeAndColor = (
    products: Product[],
    size: Size,
    color: Color
  ): Product[] =>
    products.filter((p: Product) => p.size === size && p.color === color);

  // This class can increase in volume to the infinite
}

interface ISpecification<T> {
  isSatisfied(p: T): boolean;
}

class ColorSpecification implements ISpecification<Product> {
  constructor(private color: Color) {}

  isSatisfied = (p: Product): boolean => p.color === this.color;
}

class SizeSpecification implements ISpecification<Product> {
  constructor(private size: Size) {}

  isSatisfied = (p: Product): boolean => p.size === this.size;
}

class AndSpecification<T> implements ISpecification<T> {
  private specs: ISpecification<T>[];
  constructor(...specs: ISpecification<T>[]) {
    this.specs = specs;
  }

  isSatisfied = (p: T): boolean =>
    this.specs.every((s: ISpecification<T>) => s.isSatisfied(p));
}

class BetterFilter {
  // This class can be open for extension, but closed for modification
  static filter = (
    products: Product[],
    specification: ISpecification<Product>
  ): Product[] => products.filter((p: Product) => specification.isSatisfied(p));
}

export {
  Product,
  Color,
  Size,
  ProductFilter,
  ColorSpecification,
  SizeSpecification,
  BetterFilter,
  AndSpecification,
};
