export interface SandboxContext {
  index: number;
  store: object;
  environment: object;
  compiledCodes: Record<string, string>;
  eventName: string;
  parentEventNames: string | undefined;
  // orgName,
  // operatorId
}

export interface SandboxVMScope {
  input: unknown;
  index: number;
  env: object;
  math: Math;
}
