import { describe, it, expect, vi } from 'vitest';
import {
  MultiFunctionPrinter,
  NewMultiFunctionPrinter,
  NewOldFashionedPrinter,
  NotImplementedError,
  OldFashionedPrinter,
} from './04_InterfaceSegregation';

describe('Interface Segregation', () => {
  describe('Multiple Functional Printer', () => {
    it('should print', () => {
      const spy = vi.spyOn(console, 'log');
      const printer = new MultiFunctionPrinter();
      printer.print({});
      expect(spy).toHaveBeenCalledWith('printing...');
    });
    it('should fax', () => {
      const spy = vi.spyOn(console, 'log');
      const printer = new MultiFunctionPrinter();
      printer.fax({});
      expect(spy).toHaveBeenCalledWith('faxing...');
    });
    it('should scan', () => {
      const spy = vi.spyOn(console, 'log');
      const printer = new MultiFunctionPrinter();
      printer.scan({});
      expect(spy).toHaveBeenCalledWith('scanning...');
    });
  });

  describe('Old Fashioned Printer', () => {
    it('should print', () => {
      const spy = vi.spyOn(console, 'log');
      const printer = new OldFashionedPrinter();
      printer.print({});
      expect(spy).toHaveBeenCalledWith('printing...');
    });
    it('should fax', () => {
      const spy = vi.spyOn(console, 'warn');
      const printer = new OldFashionedPrinter();
      expect(() => printer.fax({})).toThrow(NotImplementedError);
      expect(() => printer.fax({})).toThrow('OldFashionedPrinter.fax');
      expect(spy).toHaveBeenCalledWith(
        'this broke the principle of least surprise'
      );
    });
    it('should scan', () => {
      const spy = vi.spyOn(console, 'warn');
      const printer = new OldFashionedPrinter();
      expect(() => printer.scan({})).toThrow(NotImplementedError);
      expect(() => printer.scan({})).toThrow('OldFashionedPrinter.scan');
      expect(spy).toHaveBeenCalledWith(
        'this broke the principle of least surprise'
      );
    });
  });

  describe('New Multiple Functional Printer', () => {
    it('should print', () => {
      const spy = vi.spyOn(console, 'log');
      const printer = new NewMultiFunctionPrinter();
      printer.print({});
      expect(spy).toHaveBeenCalledWith('printing...');
    });
    it('should fax', () => {
      const spy = vi.spyOn(console, 'log');
      const printer = new NewMultiFunctionPrinter();
      printer.fax({});
      expect(spy).toHaveBeenCalledWith('faxing...');
    });
    it('should scan', () => {
      const spy = vi.spyOn(console, 'log');
      const printer = new NewMultiFunctionPrinter();
      printer.scan({});
      expect(spy).toHaveBeenCalledWith('scanning...');
    });
  });

  describe('Old Fashioned Printer', () => {
    it('should print', () => {
      const spy = vi.spyOn(console, 'log');
      const printer = new NewOldFashionedPrinter();
      printer.print({});
      expect(spy).toHaveBeenCalledWith('printing...');
    });
  });

  describe('NotImplementedError', () => {
    it('should have a message', () => {
      const error = new NotImplementedError('foo');
      expect(error.message).toBe('foo is not implemented');
    });
  });
});
