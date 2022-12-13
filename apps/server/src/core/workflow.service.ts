import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { WorkflowSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class WorkflowService {
  @Inject() private readonly orgService!: OrgService;

  async findOne(
    orgName: string,
    workflowName: string,
  ): Promise<WorkflowSchema> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);

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
