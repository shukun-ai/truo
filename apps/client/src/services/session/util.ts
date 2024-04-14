import z from 'zod';

import { AuthModel } from '../../models/session';

const key = 'SHUKUN_CLIENT';

const authRecordSchema = z.record(
  z.string(),
  z.object({
    userId: z.string(),
    username: z.string(),
    orgName: z.string(),
    orgId: z.string(),
    accessToken: z.string(),
    expiresTimestamp: z.number(),
  }),
);

export const setAuth = (auth: AuthModel) => {
  const authRecord = getAuthRecord();
  const newAuthRecord = {
    ...authRecord,
    [auth.orgName]: auth,
  };
  window.localStorage.setItem(key, JSON.stringify(newAuthRecord));
};

export const removeAuth = (orgName: string): void => {
  const authRecord = getAuthRecord();
  delete authRecord[orgName];
  window.localStorage.setItem(key, JSON.stringify(authRecord));
};

export const getAuthRecord = (): Record<string, AuthModel> => {
  const value = window.localStorage.getItem(key);

  if (!value) {
    return {};
  }

  try {
    const json = JSON.parse(value);
    const authRecord = authRecordSchema.parse(json);
    return authRecord;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getAuth = (orgName: string): AuthModel | null => {
  const authRecord = getAuthRecord();
  const record = authRecord[orgName];
  if (!record) {
    return null;
  }
  return record;
};
