export function isStartedWithLowercase(value: unknown): boolean {
  const regex = new RegExp(/^[a-z]{1,}/);
  return typeof value === 'string' && regex.test(value);
}
