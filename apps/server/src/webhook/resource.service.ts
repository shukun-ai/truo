import { Inject } from '@nestjs/common';
import { WorkflowTaskState } from '@shukun/schema';
import { TaskFailed } from '../util/workflow/errors/TaskFailed';

import { InputOrOutput } from '../util/workflow/types';

import { CodeResolverService } from './resolvers/code-resolver.service';
import { HttpResolverService } from './resolvers/http-resolver.service';
import { PassportResolverService } from './resolvers/passport-resolver.service';
import { SourceResolverService } from './resolvers/source-resolver.service';
import { WorkflowResolverService } from './resolvers/workflow-resolver.service';
import { Resource, ResourceOptions } from './resource.interface';

export class ResourceService implements Resource {
  @Inject() private readonly sourceResolverService: SourceResolverService;

  @Inject() private readonly httpResolverService: HttpResolverService;

  @Inject() private readonly workflowResolverService: WorkflowResolverService;

  @Inject() private readonly passportResolverService: PassportResolverService;

  @Inject() private readonly codeResolverService: CodeResolverService;

  createExecution(orgName: string, options?: ResourceOptions) {
    const { operatorId } = options || {};

    return async (
      state: WorkflowTaskState,
      parameters: InputOrOutput,
    ): Promise<InputOrOutput> => {
      const { resource } = state;

      const [resourceName, resourceMethod] = resource.split(':');

      if (resourceName === 'source') {
        const result = await this.sourceResolverService.run(
          resourceMethod,
          parameters,
          orgName,
          operatorId,
        );

        return result;
      }

      if (resourceName === 'http') {
        const result = await this.httpResolverService.run(
          resourceMethod,
          parameters,
        );

        return result;
      }

      if (resourceName === 'workflow') {
        const result = await this.workflowResolverService.run(
          resourceMethod,
          parameters,
          orgName,
          operatorId,
          this,
        );

        return result;
      }

      if (resourceName === 'passport') {
        const result = await this.passportResolverService.run(
          resourceMethod,
          parameters,
          orgName,
        );

        return result;
      }

      if (resourceName === 'code') {
        const result = await this.codeResolverService.run(
          resourceMethod,
          parameters,
          orgName,
          operatorId,
        );

        return result;
      }

      throw new TaskFailed('No matched resourceName.');
    };
  }
}
