import logger from '../utils/logger.util';

export class Person {
  streetAddress: string;
  postCode: string;
  city: string;
  companyName: string;
  position: string;
  annualIncome: number;

  constructor() {
    // Address
    this.streetAddress = this.postCode = this.city = '';
    // Employment
    this.companyName = this.position = '';
    this.annualIncome = 0;
  }

  toString(): string {
    return `Street Address: ${this.streetAddress} - Post Code: ${this.postCode} - City: ${this.city} - Company Name: ${this.companyName} - Position: ${this.position} - Annual Income: ${this.annualIncome}`;
  }
}

export interface IPersonLives {
  get lives(): PersonAddressBuilder;
}

export interface IPersonWorks {
  get works(): PersonJobBuilder;
}

export interface IPersonBuilder extends IPersonLives, IPersonWorks {
  build(): Person;
}

export class PersonBuilder implements IPersonBuilder {
  constructor(protected person: Person = new Person()) {
    logger.log('PersonBuilder constructor called');
  }

  get lives(): PersonAddressBuilder {
    return new PersonAddressBuilder(this.person);
  }

  get works(): PersonJobBuilder {
    return new PersonJobBuilder(this.person);
  }

  build(): Person {
    return this.person;
  }
}

export interface IPersonAddressBuilder {
  at(streetAddress: string): PersonAddressBuilder;
  withPostCode(postCode: string): PersonAddressBuilder;
  in(city: string): PersonAddressBuilder;
}

export class PersonAddressBuilder
  extends PersonBuilder
  implements IPersonAddressBuilder
{
  constructor(protected person: Person) {
    super(person);
  }

  at(streetAddress: string): PersonAddressBuilder {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostCode(postCode: string): PersonAddressBuilder {
    this.person.postCode = postCode;
    return this;
  }

  in(city: string): PersonAddressBuilder {
    this.person.city = city;
    return this;
  }
}

export interface IPersonJobBuilder {
  at(companyName: string): PersonJobBuilder;
  asA(position: string): PersonJobBuilder;
  earning(annualIncome: number): PersonJobBuilder;
}

export class PersonJobBuilder
  extends PersonBuilder
  implements IPersonJobBuilder
{
  constructor(protected person: Person) {
    super(person);
  }

  at(companyName: string): PersonJobBuilder {
    this.person.companyName = companyName;
    return this;
  }

  asA(position: string): PersonJobBuilder {
    this.person.position = position;
    return this;
  }

  earning(annualIncome: number): PersonJobBuilder {
    this.person.annualIncome = annualIncome;
    return this;
  }
}
