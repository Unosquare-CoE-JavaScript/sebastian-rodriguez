import { describe, expect, it } from 'vitest';
import { PersonFactory } from './FactoryExercise';

describe('Factory Exercise', () => {
  describe('PersonFactory Class', () => {
    it('should create a person', () => {
      const personFactory = new PersonFactory();
      const person = personFactory.createPerson('John Doe');
      expect(person.name).toBe('John Doe');
      expect(person.id).toBe(0);
      const person2 = personFactory.createPerson('Jane Doe');
      expect(person2.name).toBe('Jane Doe');
      expect(person2.id).toBe(1);
      const person3 = personFactory.createPerson('John Dario');
      expect(person3.name).toBe('John Dario');
      expect(person3.id).toBe(2);
    });
  });
});
