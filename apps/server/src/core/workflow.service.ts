import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkflowSchema } from '@shukun/schema';

import { CodebaseService } from './codebase.service';

@Injectable()
export class WorkflowService {
  constructor(private readonly codebaseService: CodebaseService) {}

  async findOne(
    orgName: string,
    workflowName: string,
  ): Promise<WorkflowSchema> {
    const application = await this.codebaseService.findByOrgName(orgName);

    const workflow = application.workflows?.find(
      (item) => item.name === workflowName,
    );

    if (!workflow) {
      throw new BadRequestException(
        `没有找到名为 ${workflowName} 的定制接口。`,
      );
    }

    return workflow;
  }
}
