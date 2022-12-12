export interface ResolverContext {
  index: number;
  store: object;
  environment: object;
  compiledCodes: Record<string, string>;
  eventName: string;
  parentEventNames: string | undefined;
}
