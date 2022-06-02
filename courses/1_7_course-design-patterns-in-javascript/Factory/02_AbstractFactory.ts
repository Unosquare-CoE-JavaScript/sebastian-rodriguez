export enum HotDrinks {
  Coffee = 'coffee',
  Tea = 'tea',
}

export enum HotDrinkSize {
  Small = 100,
  Medium = 250,
  Large = 500,
}

export interface IHotDrink {
  consume(): void;
}

export interface IHotDrinkFactory {
  prepare(amount: number): IHotDrink;
}

export abstract class HotDrinkFactory implements IHotDrinkFactory {
  abstract prepare(amount: number): IHotDrink;
}

export class Tea implements IHotDrink {
  consume() {
    console.log("This tea is nice but I'm not a tea person");
  }
}

export class Coffee implements IHotDrink {
  consume() {
    console.log('This coffee is delicious');
  }
}

export class TeaFactory implements HotDrinkFactory {
  public prepare(amount: number): Tea {
    console.log(
      `Put in tea bag, boil water, pour ${amount} ml, add lemon, enjoy!`
    );
    return new Tea();
  }
}

export class CoffeeFactory implements HotDrinkFactory {
  public prepare(amount: number): Coffee {
    console.log(
      `Grind some beans, boil water, pour ${amount} ml, add cream and sugar, enjoy!`
    );
    return new Coffee();
  }
}

export type IAvailableDrinks = {
  [key in HotDrinks]: typeof HotDrinkFactory;
};

export type Explicit = {
  [key: string]: any;
};

export const AvailableDrinks: IAvailableDrinks & Explicit = {
  [HotDrinks.Coffee]: CoffeeFactory,
  [HotDrinks.Tea]: TeaFactory,
};

export interface IHotDrinkMachine {
  generateDrink(drink: HotDrinks, amount: HotDrinkSize): IHotDrink;
}

export class HotDrinkMachine {
  public factories: Explicit = {};

  constructor() {
    for (const hotDrinkType in AvailableDrinks) {
      this.factories[hotDrinkType] = new AvailableDrinks[hotDrinkType]();
    }
  }

  generateDrink(drink: HotDrinks, amount: HotDrinkSize): IHotDrink {
    const factory = this.factories[drink];
    return factory.prepare(amount);
  }

  makeDrink(hotDrinkType: HotDrinks): IHotDrinkFactory {
    switch (hotDrinkType) {
      case HotDrinks.Coffee:
        return new CoffeeFactory();
      case HotDrinks.Tea:
        return new TeaFactory();
      default:
        throw new Error('Invalid drink');
    }
  }
}
