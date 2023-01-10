export function isElectronName(value: unknown): boolean {
  const regex = new RegExp(/^[a-zA-Z0-9_]*$/);
  return typeof value === 'string' && regex.test(value);
}
