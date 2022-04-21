import { describe, it, expect, beforeEach } from 'vitest';
import { CheckoutCart } from '../src/7_checkout_cart';

describe('CheckoutCart', () => {
  let checkoutCart;

  beforeEach(() => {
    checkoutCart = new CheckoutCart();
  });

  it('should create a new instance of CheckoutCart', () => {
    expect(checkoutCart).to.be.instanceOf(CheckoutCart);
  });

  it('should add an item price', () => {
    checkoutCart.addItemPrice('A', 50);
  });

  it('should add an item', () => {
    checkoutCart.addItemPrice('A', 50);
    checkoutCart.addItem('A');
  });

  it('should calculate the current total', () => {
    checkoutCart.addItemPrice('A', 50);
    checkoutCart.addItem('A');
    expect(checkoutCart.calculateTotal()).to.equal(50);
  });

  it('should add multiple items and get correct total', () => {
    checkoutCart.addItemPrice('A', 50);
    checkoutCart.addItem('A');

    checkoutCart.addItemPrice('B', 30);
    checkoutCart.addItem('B');

    expect(checkoutCart.calculateTotal()).to.equal(80);
  });

  it('should add discount rules', () => {
    checkoutCart.addDiscount('A', 3, 2);
  });

  it('should apply discount rules to the total', () => {
    checkoutCart.addDiscount('A', 3, 2);
    checkoutCart.addItemPrice('A', 3);
    checkoutCart.addItem('A');
    checkoutCart.addItem('A');
    checkoutCart.addItem('A');
    expect(checkoutCart.calculateTotal()).to.equal(2);
  });

  it('should throw an exception for item added withouth price', () => {
    expect(() => {
      checkoutCart.addItem('A');
    }).to.throw(Error);
  });
});
