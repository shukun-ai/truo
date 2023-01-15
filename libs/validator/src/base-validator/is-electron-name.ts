import { isStartedWithLowercase } from './is-started-with-lowercase';

export function isElectronName(value: unknown): boolean {
  const regex = new RegExp(/^[a-zA-Z0-9]*$/);
  return (
    typeof value === 'string' &&
    regex.test(value) &&
    isStartedWithLowercase(value)
  );
}
