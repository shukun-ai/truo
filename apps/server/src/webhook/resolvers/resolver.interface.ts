import { InputOrOutput } from '../../util/workflow/types';

export interface Resolver {
  validateParameters: () => void;
  run: (
    resourceMethod: string,
    parameters: InputOrOutput,
    orgName: string,
    operatorId?: string,
  ) => Promise<any>;
}
