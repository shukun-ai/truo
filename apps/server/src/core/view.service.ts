import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ViewSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class ViewService {
  @Inject() private readonly orgService: OrgService;

  async findAll(orgName: string): Promise<ViewSchema[]> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);

    return application?.views || [];
  }

  async findOne(orgName: string, viewName: string): Promise<ViewSchema> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);

    const view = application.views?.find((item) => item.name === viewName);

    if (!view) {
      throw new BadRequestException(`没有找到名为 ${viewName} 的定制视图。`);
    }

    return view;
  }
}
