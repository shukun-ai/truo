export function createStringFunction(code: string) {
  // eslint-disable-next-line
  return new Function('scope', code);
}
