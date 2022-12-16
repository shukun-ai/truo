import { DateResolverService } from './resolvers/date-resolver.service';
import { SourceResolverService } from './resolvers/source-resolver.service';

export interface SandboxContext {
  parameter: unknown;
  input: unknown;
  output: unknown;
  next: string;
  index: number;
  env: Record<string, string>;
  store: Record<string, unknown>;
  orgName: string;
  operatorId: string | undefined;
  parentEventNames: string | undefined;
}

export interface SandboxVMResolver {
  sourceResolver: SourceResolverService;
  date: DateResolverService;
  // TODO: add util functions
  // TODO: add http
  // TODO: add passport
  // TODO: add flow
  // TODO: add vm code
}
