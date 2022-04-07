// Definitions
// ============================================================

const Right = (x: any) => ({
  chain: (f: (arg0: any) => any) => f(x),
  map: (f: (arg0: any) => any) => Right(f(x)),
  fold: (f: (arg0: any) => any, g: (arg0: any) => any) => g(x),
  toString: () => `Right(${x})`,
});

const Left = (x: any) => ({
  chain: (f: (arg0: any) => any) => Left(x),
  map: (f: (arg0: any) => any) => Left(x),
  fold: (f: (arg0: any) => any, g: (arg0: any) => any) => f(x),
  toString: () => `Left(${x})`,
});

const fromNullable = (x: any) => (!!x ? Right(x) : Left(null));

// Functions
// ============================================================
const findColor = (name: string) =>
  ({
    red: '#ff4444',
    blue: '#3b5998',
    yellow: '#fff68f',
  }[name]);

const findColorMonad = (name: string) => 
  fromNullable(({
    red: '#ff4444',
    blue: '#3b5998',
    yellow: '#fff68f',
  }[name]))

// Test
// ============================================================
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('should find right color in hexadecimal', () => {
    const res = findColor('red');
    expect(res).toEqual('#ff4444');
    const und = findColor('undefined');
    expect(und).toEqual(undefined);
  });

  it('should find right color in hexadecimal', () => {
    const res = findColorMonad('red').fold(
      (error) => error,
      (color) => color
    );
    expect(res).toEqual('#ff4444');
    const und = findColorMonad('undefined').fold(
      (error) => error,
      (color) => color
    );
    expect(und).toEqual(null);
  });
}
