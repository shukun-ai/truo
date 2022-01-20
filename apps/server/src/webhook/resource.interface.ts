import { executeResource } from '../util/workflow/types';

export interface ResourceOptions {
  operatorId?: string;
}

export interface Resource {
  createExecution: (
    orgName: string,
    options?: ResourceOptions,
  ) => executeResource;
}
