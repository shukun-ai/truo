import { AuthenticationToken } from '@shukun/schema';

export interface IAuthStorage {
  set(payload: requesterSessionPayload): void;
  get(): requesterSessionPayload | null;
  remove(): void;
}

export type requesterSessionPayload = {
  current: AuthenticationToken;
};
