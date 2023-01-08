import { isEmail as baseIsEmail } from 'class-validator';

export function isEmail(value: unknown): boolean {
  return baseIsEmail(value);
}
