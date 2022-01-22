export function isNotDoubleUnderscore(value: unknown) {
  const regex = new RegExp(/_{2,}/);
  return typeof value === 'string' && !regex.test(value);
}
