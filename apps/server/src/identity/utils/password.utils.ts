import { pbkdf2Sync } from 'crypto';

const getSalt = () => {
  const salt = process.env.PASSWORD_SALT;
  if (!salt) {
    throw new Error('Did not set env: PASSWORD_SALT');
  }
  return salt;
};

export function cryptoPassword(value: string): string {
  const salt = getSalt();
  const key = pbkdf2Sync(value, salt, 100000, 64, 'sha512');
  return key.toString('hex');
}
