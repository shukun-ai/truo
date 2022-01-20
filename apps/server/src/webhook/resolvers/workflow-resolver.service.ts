import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { WorkflowSchema } from '@shukun/schema';
import { WorkflowService } from '../../core/workflow.service';

import { IDString } from '../../app.type';
import { executeWorkflow } from '../../util/workflow/execution';
import { InputOrOutput } from '../../util/workflow/types';
import { ResourceService } from '../resource.service';

import { Resolver } from './resolver.interface';

interface Parameters {
  workflowName: string;
  items?: InputOrOutput[];
  body?: InputOrOutput;
  headers?: InputOrOutput;
}

export class WorkflowResolverService implements Resolver {
  @Inject()
  private readonly workflowService!: WorkflowService;

  validateParameters() {
    return true;
  }

  async run(
    resourceMethod: string,
    parameters: InputOrOutput,
    orgName: string,
    operatorId?: IDString,
    resourceServiceInstance?: ResourceService,
  ): Promise<any> {
    if (!resourceServiceInstance) {
      throw new InternalServerErrorException(
        'Should pass resourceServiceInstance in params.',
      );
    }

    const { workflowName, items, body, headers } = parameters as Parameters;

    const workflow = await this.getWorkflow(workflowName, orgName);

    if (resourceMethod === 'map') {
      const results: any[] = [];

      const inputItems = items || [];

      for (const inputParameters of inputItems) {
        const input = {
          body: inputParameters,
          parent: parameters,
          index: inputItems.indexOf(inputParameters),
        };

        const result = await this.executeWorkflow(
          workflow,
          input,
          orgName,
          resourceServiceInstance,
          operatorId,
        );
        results.push(result);
      }

      return {
        items: results,
      };
    }

    if (resourceMethod === undefined) {
      const input = {
        body,
        headers,
      };

      const result = await this.executeWorkflow(
        workflow,
        input,
        orgName,
        resourceServiceInstance,
        operatorId,
      );

      return result;
    }

    throw new BadRequestException(
      'We only support workflow and workflow:map now.',
    );
  }

  private async getWorkflow(
    workflowName: string,
    orgName: string,
  ): Promise<WorkflowSchema> {
    const workflow = await this.workflowService.findOne(orgName, workflowName);

    if (!workflow.configurations) {
      throw new NotFoundException('The configuration of workflow is empty.');
    }

    return workflow;
  }

  private async executeWorkflow(
    workflow: WorkflowSchema,
    inputParameters: InputOrOutput,
    orgName: string,
    resourceServiceInstance: ResourceService,
    operatorId?: IDString,
  ) {
    if (!workflow.configurations) {
      throw new NotFoundException('The configuration of workflow is empty.');
    }

    const output = await executeWorkflow(
      workflow.configurations,
      inputParameters,
      resourceServiceInstance.createExecution(orgName, {
        operatorId,
      }),
    );
    return {
      ...output,
    };
  }
}
