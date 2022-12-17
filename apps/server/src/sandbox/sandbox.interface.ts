import { DateResolverService } from './resolvers/date-resolver.service';
import { SourceResolverService } from './resolvers/source-resolver.service';

export interface SandboxContext {
  parameter: unknown;
  input: unknown; // The input is the input of a event and it also is the output of last event.
  next: string; // The next is the next event name and it also is a start event name.
  index: number;
  env: Record<string, string>;
  store: Record<string, unknown>;
  orgName: string;
  operatorId: string | undefined;
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
