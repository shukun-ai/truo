export function isStartedWithLowercase(value: unknown) {
  const regex = new RegExp(/^[a-z]{1,}/);
  return typeof value === 'string' && regex.test(value);
}
