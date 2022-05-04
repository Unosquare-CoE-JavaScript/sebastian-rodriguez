export interface IRelationship {
  from: Person;
  to: Person;
  type: Relationship;
}

export enum Relationship {
  Parent,
  Child,
  Sibling,
}

export class Person {
  constructor(public name: string) {}
}

// LOW LEVEL MODULE

export interface IRelationshipBrowser {
  findAllChildrenOf(name: string): Person[];
} 

export class Relationships implements IRelationshipBrowser {
  constructor(public data: IRelationship[]) {}

  addParentAndChild(parent: Person, child: Person) {
    this.data.push({ from: parent, to: child, type: Relationship.Parent });
    this.data.push({ from: child, to: parent, type: Relationship.Child });
  }

  findAllChildrenOf = (name: string): Person[] =>
    this.data
      .filter((r) => r.type === Relationship.Parent && r.from.name === name)
      .map((r) => r.to);
}

// HIGH LEVEL MODULE
// export class RelationshipBrowser {
//   relations: IRelationship[];
//   constructor(public relationships: Relationships) {
//     this.relations = relationships.data;
//   }

//   findAllChildrenOf(name: string): Person[] {
//     return this.relations
//       .filter((r) => r.type === Relationship.Parent && r.from.name === name)
//       .map((r) => r.to);
//   }
// }
