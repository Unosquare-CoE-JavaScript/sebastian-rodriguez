export class Person {
  constructor(public name: string, public id: number) {}
}

export class PersonFactory {
  idCounter: number = 0;
  createPerson(name: string) {
    return new Person(name, this.idCounter++);
  }
}
