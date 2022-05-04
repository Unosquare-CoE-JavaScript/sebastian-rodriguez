import { describe, expect, it } from 'vitest';
import { ChiefExecutiveOfficer } from './02_Monostate';

describe('ChiefExecutiveOfficer Class', () => {
  it('should have a static _name property', () => {
    expect(ChiefExecutiveOfficer).toHaveProperty('_name');
  });

  it('should have a static age property', () => {
    expect(ChiefExecutiveOfficer).toHaveProperty('age');
  });

  it('should create a new instance of ChiefExecutiveOfficer', () => {
    const ceo = new ChiefExecutiveOfficer();
    expect(ceo).toBeInstanceOf(ChiefExecutiveOfficer);
  });

  it('should create a new ChiefExecutiveOfficer', () => {
    const ceo = new ChiefExecutiveOfficer();
    ceo.name = 'Adam Smith';
    ceo.age = 45;
    expect(ceo.toString()).toBe(
      "CEO's name if Adam Smith and he is 45 years old."
    );
  });

  it('should modifie only one instance of ChiefExecutiveOfficer', () => {
    const ceo = new ChiefExecutiveOfficer();
    ceo.name = 'Adam Smith';
    ceo.age = 45;
    expect(ceo.toString()).toBe(
      "CEO's name if Adam Smith and he is 45 years old."
    );
    ceo.name = 'John Doe';
    ceo.age = 50;
    expect(ceo.toString()).toBe(
      "CEO's name if John Doe and he is 50 years old."
    );
  });

  it('should have a toString method', () => {
    expect(ChiefExecutiveOfficer).toHaveProperty('toString');
    expect(ChiefExecutiveOfficer.toString).toBeInstanceOf(Function);
  });
});
