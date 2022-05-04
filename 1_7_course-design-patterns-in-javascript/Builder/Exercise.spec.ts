import { describe, expect, it } from 'vitest';
import logger from '../utils/logger.util';
import { AllNewClassBuilder, CodeBuilder } from './Exercise';

describe('Code Builder', () => {
  it('should be render a new class', () => {
    const cb = new CodeBuilder('Persona');
    cb.addField('nombre').addField('apellido');
    expect(cb.toString()).toEqual(`class Persona {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
  }
};`);
  });

  describe('AllNewClassBuilder', () => {
    it('should add a field', () => {
      const cb = new AllNewClassBuilder();
      cb.addClassName('Persona');
      cb.field.addField('nombre');
      cb.field.addField('primer apellido');
      cb.field.addField('segundo apellido');
      cb.field.addField('profesion');
      expect(cb.build().fields).toStrictEqual([
        'nombre',
        'primer apellido',
        'segundo apellido',
        'profesion',
      ]);
    });
  });
});
