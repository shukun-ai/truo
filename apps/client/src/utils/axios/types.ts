export interface QueryParams {
  limit?: number;
  skip?: number;
  count?: boolean;
  // TODO set correct type for filter
  filter?: unknown;
  sort?: string;
}

export interface ApiResponseData<Value> {
  count?: number;
  value: Value;
}

export enum ResourceType {
  Public = 'public',
  Internal = 'internal',
  Core = 'core',
  Source = 'source',
  View = 'view',
  Webhook = 'webhook',
  Developer = 'developer',
}
