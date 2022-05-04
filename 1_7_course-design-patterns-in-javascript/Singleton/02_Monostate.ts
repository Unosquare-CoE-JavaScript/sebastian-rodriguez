export class ChiefExecutiveOfficer {
  static _name: string | undefined = undefined;
  static age: number | undefined = undefined;
  get name() {
    return ChiefExecutiveOfficer._name;
  }

  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  get age() {
    return ChiefExecutiveOfficer.age;
  }

  set age(value) {
    ChiefExecutiveOfficer.age = value;
  }

  toString() {
    return `CEO's name if ${this.name} ` + `and he is ${this.age} years old.`;
  }
}
