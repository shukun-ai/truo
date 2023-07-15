import { BadRequestException, Injectable } from '@nestjs/common';
import { ViewSchema } from '@shukun/schema';

import { CodebaseService } from './codebase.service';

@Injectable()
export class ViewService {
  constructor(private readonly codebaseService: CodebaseService) {}

  async findAll(orgName: string): Promise<ViewSchema[]> {
    const application = await this.codebaseService.findByOrgName(orgName);

    return application?.views || [];
  }

  async findOne(orgName: string, viewName: string): Promise<ViewSchema> {
    const application = await this.codebaseService.findByOrgName(orgName);

    const view = application.views?.find((item) => item.name === viewName);

    if (!view) {
      throw new BadRequestException(`没有找到名为 ${viewName} 的定制视图。`);
    }

    return view;
  }
}
