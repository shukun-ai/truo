import { SandboxContext } from '../sandbox/sandbox.interface';

export type ResolverContext = SandboxContext;

export interface ExternalContext {
  orgName: string;
  operatorId: string | undefined;
}
