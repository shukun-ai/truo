import { DateResolverService } from './resolvers/date-resolver.service';
import { SourceResolverService } from './resolvers/source-resolver.service';

/**
 * @remark
 *
 * The input is the input of a event and it also is the output of last event.
 * The next is the next event name and it also is a start event name.
 */
export interface SandboxContext {
  input: unknown;
  next: string;
  index: number;
  env: Record<string, string>;
  store: Record<string, unknown>;
  orgName: string;
  operatorId: string | undefined;
}

/**
 * @remark
 *
 * start with '_' means this is a private resolver, will be check injection in compile.
 */
export interface SandboxVMResolver {
  _sourceResolver: SourceResolverService;
  date: DateResolverService;
  // TODO: add util functions
  // TODO: add http
  // TODO: add passport
  // TODO: add flow
  // TODO: add vm code
}
