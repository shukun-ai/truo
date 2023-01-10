export function isMaxLength(value: unknown, maxLength: number): boolean {
  return typeof value === 'string' && value.length > maxLength;
}
