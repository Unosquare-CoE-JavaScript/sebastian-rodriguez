import { describe, expect, it } from 'vitest';
import { Person, PersonBuilder } from './02_BuilderFacets';

describe('Builder Facets', () => {
  describe('Person', () => {
    it('should instantiate', () => {
      const person = new Person();
      expect(person).toBeDefined();
    });
  });

  describe('PersonBuilder', () => {
    it('should instantiate', () => {
      const personBuilder = new PersonBuilder();
      expect(personBuilder).toBeDefined();
    });

    it('should build a person', () => {
      const personBuilder = new PersonBuilder();
      personBuilder.lives.at('123 Main St').withPostCode('12345').in('Anytown');
      personBuilder.works.asA('Software Engineer').earning(100000);
      const person = personBuilder.build();

      expect(person).toBeDefined();
      expect(person.streetAddress).toBe('123 Main St');
      expect(person.postCode).toBe('12345');
      expect(person.city).toBe('Anytown');
      expect(person.position).toBe('Software Engineer');
      expect(person.annualIncome).toBe(100000);
    });

    it('should print a person', () => {
      const personBuilder = new PersonBuilder();
      personBuilder.lives.at('123 Main St').withPostCode('12345').in('Anytown');
      personBuilder.works.asA('Software Engineer').at('Google').earning(100000);
      const person = personBuilder.build();

      expect(person.toString()).toBe(
        `Street Address: 123 Main St - Post Code: 12345 - City: Anytown - Company Name: Google - Position: Software Engineer - Annual Income: 100000`
      );
    });
  });

  describe('PersonAddressBuilder', () => {
    it('should instantiate', () => {
      const person = new Person();
      const personBuilder = new PersonBuilder(person);
      const personAddressBuilder = personBuilder.lives;
      expect(personAddressBuilder).toBeDefined();
    });

    it('should build', () => {
      const person = new Person();
      const personBuilder = new PersonBuilder(person);
      const personAddressBuilder = personBuilder.lives
        .at('123 Main St')
        .withPostCode('12345')
        .in('Anytown')
        .build();
      expect(personAddressBuilder).toBeDefined();
      expect(personAddressBuilder.streetAddress).toBe('123 Main St');
      expect(personAddressBuilder.postCode).toBe('12345');
      expect(personAddressBuilder.city).toBe('Anytown');
    });
  });

  describe('PersonJobBuilder', () => {
    it('should instantiate', () => {
      const person = new Person();
      const personBuilder = new PersonBuilder(person);
      const personJobBuilder = personBuilder.works;
      expect(personJobBuilder).toBeDefined();
    });

    it('should build', () => {
      const person = new Person();
      const personBuilder = new PersonBuilder(person);
      const personJobBuilder = personBuilder.works
        .asA('Developer')
        .at('Google')
        .earning(100000)
        .build();
      expect(personJobBuilder).toBeDefined();
      expect(personJobBuilder.position).toBe('Developer');
      expect(personJobBuilder.companyName).toBe('Google');
      expect(personJobBuilder.annualIncome).toBe(100000);
    });
  });
});
