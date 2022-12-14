import { SourceResolverService } from './resolvers/source-resolver.service';
import { ObservableStore, SandboxStore } from './stores/observable-store.class';

export interface SandboxContext {
  index: number;
  input: unknown;
  store: ObservableStore;
  environment: object;
  compiledCodes: Record<string, string>;
  eventName: string;
  parentEventNames: string | undefined;
  orgName: string;
  operatorId: string | undefined;
}

export interface SandboxVMScope {
  input: unknown;
  index: number;
  env: object;
  math: Math;
  store: SandboxStore;
  observableStore: ObservableStore;
  sourceResolver: SourceResolverService;
  orgName: string;
  operatorId: string | undefined;
  // TODO: add date
  // TODO: add util functions
  // TODO: add http
  // TODO: add passport
  // TODO: add flow
  // TODO: add vm code
}
