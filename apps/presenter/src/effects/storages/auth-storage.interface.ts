export interface IAuthStorage {
  set(payload: requesterSessionPayload): void;
  get(): requesterSessionPayload | null;
  remove(): void;
}

export type requesterSessionPayload = {
  orgName: string;
  accessToken: string;
};
