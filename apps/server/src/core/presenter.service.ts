import { Injectable } from '@nestjs/common';
import { SourceNotFoundException } from '@shukun/exception';
import { PresenterSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class PresenterService {
  constructor(private readonly orgService: OrgService) {}

  async findAll(orgName: string): Promise<Record<string, PresenterSchema>> {
    const presenters = await this.orgService.findPresenters(orgName);
    return presenters;
  }

  async findOne(
    orgName: string,
    presenterName: string,
  ): Promise<PresenterSchema> {
    const presenters = await this.findAll(orgName);
    const presenter = presenters[presenterName];
    if (!presenter) {
      throw new SourceNotFoundException(
        'Did not find specific presenter: {{presenterName}}',
        {
          presenterName,
        },
      );
    }
    return presenter;
  }

  async update(
    orgName: string,
    presenters: Record<string, PresenterSchema>,
  ): Promise<void> {
    await this.orgService.updatePresenters(orgName, presenters);
  }
}
