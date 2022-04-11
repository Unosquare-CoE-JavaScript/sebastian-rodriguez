'use strict';

export class CheckoutCart {
  constructor() {
    this.prices = {};
    this.items = {};
    this.discounts = {};
  }

  addItemPrice(item, price) {
    this.prices[item] = price;
  }

  addItem(item) {
    if (!this.prices[item]) {
      throw new Error('Item not found');
    }
    if (this.items[item] === undefined) {
      this.items[item] = 1;
    } else {
      this.items[item]++;
    }
  }

  addDiscount(item, count, discountPrice) {
    this.discounts[item] = { count, discountPrice };
  }

  calculateTotal() {
    let total = 0;
    for (let item in this.items) {
      let discount = this.discounts[item];
      if (discount) {
        const numberOfDiscounts = this.items[item] / discount.count;
        total += numberOfDiscounts * discount.discountPrice;
        const reminder = this.items[item] % discount.count;
        total += reminder * this.prices[item];
      } else {
        total += this.items[item] * this.prices[item];
      }
    }
    return total;
  }
}
