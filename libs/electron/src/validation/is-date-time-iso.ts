import { isISO8601 } from 'class-validator';

export function isDateTimeIso(value: unknown): boolean {
  const passISO8601 = isISO8601(value, { strict: true });
  if (typeof value === 'string') {
    const sets = value.split('');
    if (sets[10] !== 'T') {
      return false;
    }
  }
  return passISO8601;
}
