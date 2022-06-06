import { describe, expect, it, vi } from 'vitest';
import {
  Coffee,
  CoffeeFactory,
  HotDrinkMachine,
  HotDrinks,
  HotDrinkSize,
  Tea,
  TeaFactory,
} from './02_AbstractFactory';

describe('Abstract Factory', () => {
  describe('Tea Class', () => {
    it('should consume tea', () => {
      const spy = vi.spyOn(console, 'log');
      const tea = new Tea();
      tea.consume();
      expect(spy).toHaveBeenCalledWith(
        "This tea is nice but I'm not a tea person"
      );
    });
  });

  describe('Tea Factory Class', () => {
    it('should prepare tea', () => {
      const spy = vi.spyOn(console, 'log');
      const teaFactory = new TeaFactory();
      const newTea = teaFactory.prepare(100);
      expect(spy).toHaveBeenCalledWith(
        'Put in tea bag, boil water, pour 100 ml, add lemon, enjoy!'
      );
      newTea.consume();
      expect(spy).toHaveBeenCalledWith(
        "This tea is nice but I'm not a tea person"
      );
    });
  });

  describe('Coffee Factory Class', () => {
    it('should prepare coffee', () => {
      const spy = vi.spyOn(console, 'log');
      const coffeeFactory = new CoffeeFactory();
      const newCoffee = coffeeFactory.prepare(100);
      expect(spy).toHaveBeenCalledWith(
        'Grind some beans, boil water, pour 100 ml, add cream and sugar, enjoy!'
      );
      newCoffee.consume();
      expect(spy).toHaveBeenCalledWith('This coffee is delicious');
    });
  });

  describe('Coffee Class', () => {
    it('should consume coffee', () => {
      const spy = vi.spyOn(console, 'log');
      const coffee = new Coffee();
      coffee.consume();
      expect(spy).toHaveBeenCalledWith('This coffee is delicious');
    });
  });

  describe('Hot Drink Machine Class', () => {
    it('should make tea', () => {
      const teaSize = HotDrinkSize.Large;
      const spy = vi.spyOn(console, 'log');
      const hotDrinkMachine = new HotDrinkMachine();
      const tea = hotDrinkMachine.makeDrink(HotDrinks.Tea).prepare(teaSize);
      tea.consume();
      expect(spy).toHaveBeenCalledWith(
        `Put in tea bag, boil water, pour ${teaSize} ml, add lemon, enjoy!`
      );
    });

    it('should make coffee', () => {
      const coffeeSize = HotDrinkSize.Small;
      const spy = vi.spyOn(console, 'log');
      const hotDrinkMachine = new HotDrinkMachine();
      const coffee = hotDrinkMachine
        .makeDrink(HotDrinks.Coffee)
        .prepare(coffeeSize);
      coffee.consume();
      expect(spy).toHaveBeenCalledWith(
        `Grind some beans, boil water, pour ${coffeeSize} ml, add cream and sugar, enjoy!`
      );
    });

    it('should make tea and coffee', () => {
      const teaSize = HotDrinkSize.Large;
      const coffeeSize = HotDrinkSize.Small;
      const spy = vi.spyOn(console, 'log');
      const hotDrinkMachine = new HotDrinkMachine();
      const tea = hotDrinkMachine.makeDrink(HotDrinks.Tea).prepare(teaSize);
      tea.consume();
      expect(spy).toHaveBeenCalledWith(
        `Put in tea bag, boil water, pour ${teaSize} ml, add lemon, enjoy!`
      );
      const coffee = hotDrinkMachine
        .makeDrink(HotDrinks.Coffee)
        .prepare(coffeeSize);
      coffee.consume();
      expect(spy).toHaveBeenCalledWith(
        `Grind some beans, boil water, pour ${coffeeSize} ml, add cream and sugar, enjoy!`
      );
    });

    it('should generate tea', () => {
      const spy = vi.spyOn(console, 'log');
      const hotDrinkMachine = new HotDrinkMachine();
      const tea = hotDrinkMachine.generateDrink(
        HotDrinks.Tea,
        HotDrinkSize.Large
      );
      tea.consume();
      expect(spy).toHaveBeenCalledWith(
        `Put in tea bag, boil water, pour ${HotDrinkSize.Large} ml, add lemon, enjoy!`
      );
    });
  });
});
