export function isNotDoubleUnderscore(value: unknown): boolean {
  const regex = new RegExp(/_{2,}/);
  return typeof value === 'string' && !regex.test(value);
}
