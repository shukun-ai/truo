import { SourceResolverService } from './resolvers/source-resolver.service';

export interface SandboxContext {
  index: number;
  store: object;
  environment: object;
  compiledCodes: Record<string, string>;
  eventName: string;
  parentEventNames: string | undefined;
  // TODO: add orgName
  // TODO: add operatorId
}

export interface SandboxVMScope {
  input: unknown;
  index: number;
  env: object;
  math: Math;
  sourceResolver: SourceResolverService;
  // TODO: add orgName
  // TODO: add operatorId
  // TODO: add date
  // TODO: add util functions
  // TODO: add http
  // TODO: add passport
  // TODO: add flow
  // TODO: add vm code
}
