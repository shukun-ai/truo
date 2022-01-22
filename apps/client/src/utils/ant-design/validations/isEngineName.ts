export function isEngineName(value: unknown) {
  const regex = new RegExp(/^[a-z0-9_]*$/);
  return typeof value === 'string' && regex.test(value);
}
