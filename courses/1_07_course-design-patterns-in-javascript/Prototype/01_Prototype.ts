export class Address {
  constructor(
    public street: string,
    public city: string,
    public country: string
  ) {}

  deepCopy(): Address {
    return new Address(this.street, this.city, this.country);
  }
}

export class CompanyAddress {
  constructor(
    public suite: string | null,
    public street: string,
    public city: string
  ) {}
}

export class Person {
  constructor(public name: string, public address: Address) {}

  deepCopy(): Person {
    return new Person(this.name, this.address.deepCopy());
  }
}

export class Employee {
  constructor(public name: string | null, public address: CompanyAddress) {}
}

export class Serializer {
  constructor(public types: any[]) {}

  markRecursive(obj: any) {
    let idx = this.types.findIndex((t: any) => t.name === obj.constructor.name);
    if (idx === -1) {
      throw new Error('Unknown type');
    }
    obj.__type = idx;
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop) && obj[prop] !== null) {
        if (typeof obj[prop] === 'object') {
          this.markRecursive(obj[prop]);
        }
      }
    }
  }

  clone(obj: any) {
    this.markRecursive(obj);
    let copy = JSON.parse(JSON.stringify(obj));
    return this.reconstructRecursive(copy);
  }

  reconstructRecursive(copy: any) {
    if (copy.__type !== undefined) {
      let type = this.types[copy.__type];
      let obj = new type();
      for (let prop in copy) {
        if (copy.hasOwnProperty(prop) && copy[prop] !== null) {
          if (typeof copy[prop] === 'object') {
            obj[prop] = this.reconstructRecursive(copy[prop]);
          } else {
            obj[prop] = copy[prop];
          }
        }
      }
      return obj;
    }
  }
}

export class EmployeeFactory {
  static main: Employee;
  static aux: Employee;
  static serializer: Serializer;

  private static _newEmployee(proto: any, name: string, suite: number) {
    const copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name: string, suite: number) {
    return EmployeeFactory._newEmployee(EmployeeFactory.main, name, suite);
  }

  static newAuxOfficeEmployee(name: string, suite: number) {
    return EmployeeFactory._newEmployee(EmployeeFactory.aux, name, suite);
  }
}
