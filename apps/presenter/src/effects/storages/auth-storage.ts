import {
  IAuthStorage,
  requesterSessionPayload,
} from './auth-storage.interface';

export class AuthStorage implements IAuthStorage {
  private STORAGE_KEY = 'SHUKUN_PRESENTER_AUTH';

  set(payload: requesterSessionPayload): void {
    const string = JSON.stringify(payload);
    window.localStorage.setItem(this.STORAGE_KEY, string);
  }

  get(): requesterSessionPayload | null {
    const value = window.localStorage.getItem(this.STORAGE_KEY);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch {
      console.error('JSON Parse fail when get AuthStorage.');
      return null;
    }
  }

  remove(): void {
    window.localStorage.removeItem(this.STORAGE_KEY);
  }
}
