import { Injectable } from '@nestjs/common';
import { SystemPositionModel } from '@shukun/schema';

import { SourceService } from '../source/source.service';

@Injectable()
export class SystemPositionService {
  constructor(
    private readonly systemPositionSourceService: SourceService<SystemPositionModel>,
  ) {}
  async findAll(orgName: string, userId: string) {
    return await this.systemPositionSourceService.query(
      orgName,
      'system__positions',
      {
        filter: { users: userId },
      },
    );
  }
}
