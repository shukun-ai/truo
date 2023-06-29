import { AuthenticationToken } from '@shukun/schema';

export type requesterSessionPayload = {
  current: AuthenticationToken;
};

export const AUTH_STORAGE_KEY = 'SHUKUN_PRESENTER_AUTH';

export const setAuthStorage = (payload: requesterSessionPayload): void => {
  const string = JSON.stringify(payload);
  window.localStorage.setItem(AUTH_STORAGE_KEY, string);
};

export const getAuthStorage = (): requesterSessionPayload | null => {
  const value = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    console.error('JSON Parse fail when get AuthStorage.');
    return null;
  }
};

export const remove = (): void => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};
