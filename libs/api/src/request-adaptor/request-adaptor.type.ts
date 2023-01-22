import { IDString } from '@shukun/schema';

export type ApiRequesterOptions = {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  onOrgName: () => string | null;
  onAccessToken: () => string | null;
};

export type ApiRequesterMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiRequestPayload = {
  params?: unknown;
  body?: unknown;
  headers?: Record<string, string>;
};

export type ApiResponse<Model> = {
  data: {
    count?: number;
    value: Model;
  };
};

export type SignInDto = {
  username: string;
  password: string;
};

export type EncryptSignInDto = {
  username: string;
  encryptPassword: string;
};

export type AddToManyDto = {
  electronName: string;
  foreignId: string;
};

export type RemoveFromManyDto = AddToManyDto;

export type IncreaseDto = {
  electronName: string;
  increment: number;
};

export type CreateResponseData = { _id: IDString };
