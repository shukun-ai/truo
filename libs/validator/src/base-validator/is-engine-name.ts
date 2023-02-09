import { isNotDoubleUnderscore } from './is-not-double-underscore';

export function isEngineName(value: unknown): boolean {
  const regex = new RegExp(/^[a-z0-9_]*$/);

  if (typeof value !== 'string') {
    return false;
  }

  if (!regex.test(value)) {
    return false;
  }

  if (value.startsWith('system__')) {
    return true;
  }

  return isNotDoubleUnderscore(value);
}
