import { describe, expect, it, vi } from 'vitest';
import { VectorRectangle } from './01_Adapter';
import { drawCaching } from './02_AdapterCaching';

describe('Adapter Caching', () => {
  describe('drawPoints with caching', () => {
    it('should draw', () => {
      const spy = vi.spyOn(console, 'log');
      let vectorObjects = [
        new VectorRectangle(1, 1, 10, 10),
        new VectorRectangle(3, 3, 6, 6),
      ];
      drawCaching(vectorObjects);
      expect(spy).toHaveBeenCalledTimes(8);
      expect(spy).toHaveBeenCalledWith(
        '0: Generating points for line (1, 1)→(11, 1) (with caching)'
      );
      expect(spy).toHaveBeenCalledWith(
        '1: Generating points for line (11, 1)→(11, 11) (with caching)'
      );
      expect(spy).toHaveBeenCalledWith(
        '2: Generating points for line (1, 1)→(1, 11) (with caching)'
      );
      expect(spy).toHaveBeenCalledWith(
        '3: Generating points for line (1, 11)→(11, 11) (with caching)'
      );
      expect(spy).toHaveBeenCalledWith(
        '4: Generating points for line (3, 3)→(9, 3) (with caching)'
      );
      expect(spy).toHaveBeenCalledWith(
        '5: Generating points for line (9, 3)→(9, 9) (with caching)'
      );
      expect(spy).toHaveBeenCalledWith(
        '6: Generating points for line (3, 3)→(3, 9) (with caching)'
      );
      expect(spy).toHaveBeenCalledWith(
        '7: Generating points for line (3, 9)→(9, 9) (with caching)'
      );
    });
  });
});
