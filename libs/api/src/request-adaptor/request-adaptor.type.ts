import { IDString } from '@shukun/schema';

export type ApiRequesterOptions = {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
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
  status: HttpStatusCode;
};

export type SignInDto = {
  username: string;
  password: string;
};

export type SeedCreateDto = {
  name: string;
  label: string;
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

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}
