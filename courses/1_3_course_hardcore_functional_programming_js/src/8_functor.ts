const Box = (x: any) => ({
  map: (f: any) => Box(f(x)),
  fold: (f: any) => f(x),
  inspect: () => `Box(${x})`,
});

const nextCharForNumber = (str: string) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
};

const nextCharForNumberSandboxed = (str: string) =>
  Box(str)
    .map((x: string) => x.trim())
    .map((trimmed: string) => parseInt(trimmed, 10))
    .map((number: number) => new Number(number + 1))
    .fold(String.fromCharCode)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('should return the next character for a number', () => {
    expect(nextCharForNumber('  64  ')).toEqual('A');
  })

  it('should return the next character for a number', () => {
    expect(nextCharForNumberSandboxed('  64  ')).toEqual('A');
  })
}