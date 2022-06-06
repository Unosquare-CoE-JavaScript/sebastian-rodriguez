import { describe, it, expect, beforeEach } from 'vitest';
import {
  Address,
  CompanyAddress,
  Employee,
  EmployeeFactory,
  Person,
  Serializer,
} from './01_Prototype';

describe('Prototype', () => {
  describe('Person', () => {
    it('should create a person', () => {
      const personAddress = new Address('123 Main St', 'Anytown', 'USA');
      const person = new Person('John Doe', personAddress);
      expect(person.name).toBe('John Doe');
      expect(person.address.street).toBe('123 Main St');
      expect(person.address.city).toBe('Anytown');
      expect(person.address.country).toBe('USA');
    });

    it('should create a deep copy of a person', () => {
      const personAddress = new Address('123 Main St', 'Anytown', 'USA');
      const person = new Person('John Doe', personAddress);
      expect(person.name).toBe('John Doe');
      expect(person.address.street).toBe('123 Main St');
      expect(person.address.city).toBe('Anytown');
      expect(person.address.country).toBe('USA');
      const deepCopy = person.deepCopy();
      deepCopy.name = 'Jane Doe';
      deepCopy.address.street = '321 Main St';
      expect(deepCopy.name).toBe('Jane Doe');
      expect(deepCopy.address.street).toBe('321 Main St');
      expect(deepCopy.address.city).toBe('Anytown');
      expect(deepCopy.address.country).toBe('USA');
    });

    it('should create a clone with the Serializer Class', () => {
      const personAddress = new Address('123 Main St', 'Anytown', 'USA');
      const person = new Person('John Doe', personAddress);
      expect(person.name).toBe('John Doe');
      expect(person.address.street).toBe('123 Main St');
      expect(person.address.city).toBe('Anytown');
      expect(person.address.country).toBe('USA');
      const serializer = new Serializer([Person, Address]);
      const clone = serializer.clone(person);
      clone.name = 'Jane Doe';
      clone.address.street = '321 Main St';
      expect(clone.name).toBe('Jane Doe');
      expect(clone.address.street).toBe('321 Main St');
      expect(clone.address.city).toBe('Anytown');
      expect(clone.address.country).toBe('USA');
    });
  });

  describe('Employee Factory Class', () => {
    beforeEach(() => {
      EmployeeFactory.main = new Employee(
        null,
        new CompanyAddress(null, 'B', 'C')
      );
      EmployeeFactory.aux = new Employee(
        null,
        new CompanyAddress(null, 'E', 'F')
      );
      EmployeeFactory.serializer = new Serializer([Employee, CompanyAddress]);
    });
    it('should create an employee', () => {
      const employee = new EmployeeFactory();
      expect(employee).toBeDefined();
    });

    it('should create a new employee in main office', () => {
      const john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
      expect(john.name).toBe('John');
      expect(john.address.suite).toBe(4321);
      expect(john.address.street).toBe('B');
      expect(john.address.city).toBe('C');
    });

    it('should create a new employee in aux office', () => {
      const jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 4321);
      expect(jane.name).toBe('Jane');
      expect(jane.address.suite).toBe(4321);
      expect(jane.address.street).toBe('E');
      expect(jane.address.city).toBe('F');
    });
  });
});
