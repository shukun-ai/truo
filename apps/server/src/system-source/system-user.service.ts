import { Injectable } from '@nestjs/common';

import { SourceService } from '../source/source.service';
import { SystemUserModel } from '../util/schema/models/system-users';

@Injectable()
export class SystemUserService {
  constructor(
    private readonly systemUserSourceService: SourceService<SystemUserModel>,
  ) {}
  async findOne(orgName: string, userId: string) {
    return await this.systemUserSourceService.findOne(
      orgName,
      'system__users',
      {
        filter: { _id: userId },
      },
    );
  }
}
