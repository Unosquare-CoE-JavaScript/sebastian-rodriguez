import { describe, expect, it } from 'vitest';
import { Person, Relationship, Relationships } from './05_DependencyInversion';

const john = new Person('John');
const jane = new Person('Jane');
const mary = new Person('Mary');

describe('Dependency Inversion Principle', () => {
  describe('Person', () => {
    it('should be instatiated with a name', () => {
      const person = new Person('John');
      expect(person.name).toBe('John');
    });
  });

  describe('Relationships', () => {
    const basicRelationships = [
      { from: john, to: jane, type: Relationship.Parent },
      { from: jane, to: john, type: Relationship.Child },
    ];

    it('should be instatiated with a data array', () => {
      const relationships = new Relationships(basicRelationships);
      expect(relationships.data).toEqual(basicRelationships);
    });

    it('should add a parent and child relationship', () => {
      const relationships = new Relationships([]);
      relationships.addParentAndChild(john, jane);
      expect(relationships.data).toEqual([
        { from: john, to: jane, type: Relationship.Parent },
        { from: jane, to: john, type: Relationship.Child },
      ]);
      relationships.addParentAndChild(john, mary);
      expect(relationships.data).toEqual([
        { from: john, to: jane, type: Relationship.Parent },
        { from: jane, to: john, type: Relationship.Child },
        { from: john, to: mary, type: Relationship.Parent },
        { from: mary, to: john, type: Relationship.Child },
      ]);
    });

    it('should find all children of a person', () => {
      const relationships = new Relationships(basicRelationships);
      expect(relationships.findAllChildrenOf('John')).toEqual([jane]);
      expect(relationships.findAllChildrenOf('Jane')).toEqual([]);
    });

    it('should find all children of a person', () => {
      const relationships = new Relationships(basicRelationships);
      relationships.addParentAndChild(john, mary);
      expect(relationships.findAllChildrenOf('John')).toEqual([jane, mary]);
    });
  });

  // describe('RelationshipBrowser', () => {
  //   const basicRelationships = [
  //     { from: john, to: jane, type: Relationship.Parent },
  //     { from: jane, to: john, type: Relationship.Child },
  //   ];

  //   it('should be instatiated with a relationships object', () => {
  //     const relationships = new Relationships(basicRelationships);
  //     const browser = new RelationshipBrowser(relationships);
  //     expect(browser.relations).toEqual(basicRelationships);
  //   });

  //   it('should find all children of a person', () => {
  //     const relationships = new Relationships(basicRelationships);
  //     const browser = new RelationshipBrowser(relationships);
  //     expect(browser.findAllChildrenOf('John')).toEqual([jane]);
  //     expect(browser.findAllChildrenOf('Jane')).toEqual([]);
  //   });

  //   it('should find all children of a person', () => {
  //     const relationships = new Relationships(basicRelationships);
  //     relationships.addParentAndChild(john, mary);
  //     const browser = new RelationshipBrowser(relationships);
  //     expect(browser.findAllChildrenOf('John')).toEqual([jane, mary]);
  //   });
  // });
});
