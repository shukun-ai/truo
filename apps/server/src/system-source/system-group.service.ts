import { Injectable } from '@nestjs/common';
import { SystemGroupModel } from '@shukun/schema';

import { SourceService } from '../source/source.service';

@Injectable()
export class SystemGroupService {
  constructor(
    private readonly systemGroupSourceService: SourceService<SystemGroupModel>,
  ) {}
  async findAll(orgName: string, userId: string) {
    return await this.systemGroupSourceService.query(
      orgName,
      'system__groups',
      {
        filter: { users: userId },
      },
    );
  }
}
