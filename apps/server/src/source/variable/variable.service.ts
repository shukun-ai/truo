import { Inject, Injectable } from '@nestjs/common';
import { SystemVariableModel } from '@shukun/schema';

import { SourceService } from '../source.service';

@Injectable()
export class VariableService {
  @Inject() private readonly sourceService: SourceService<SystemVariableModel>;

  async findAll(orgName: string): Promise<SystemVariableModel[]> {
    // @todo should add cache
    const variables = await this.sourceService.findAll(
      orgName,
      'system__variables',
      {
        filter: {},
        limit: 500,
      },
    );

    return variables;
  }
}
