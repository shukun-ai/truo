import { SourceResolverService } from './resolvers/source-resolver.service';

export interface SandboxContext {
  parameter: unknown;
  input: unknown;
  output: unknown;
  next: string | null;
  index: number;
  env: Record<string, string>;
  store: Record<string, unknown>;
  orgName: string;
  operatorId: string | undefined;
  eventName: string;
  parentEventNames: string | undefined;
}

export interface SandboxVMResolver {
  sourceResolver: SourceResolverService;
  // TODO: add date
  // TODO: add util functions
  // TODO: add http
  // TODO: add passport
  // TODO: add flow
  // TODO: add vm code
}
