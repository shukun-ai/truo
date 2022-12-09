import { Inject, Injectable } from '@nestjs/common';
import { HttpQuerySchema } from '@shukun/schema';

import { SourceService } from './source.service';

@Injectable()
export class SourceNextStandardService<Model> {
  @Inject()
  private readonly sourceService!: SourceService<Model>;

  async getMetadata(orgName: string, atomName: string) {
    return this.sourceService.getMetadata(orgName, atomName);
  }

  async findAll(orgName: string, atomName: string, query: HttpQuerySchema) {
    return this.sourceService.findAll(orgName, atomName, query);
  }

  async count(orgName: string, atomName: string, query: HttpQuerySchema) {
    return this.sourceService.count(orgName, atomName, query);
  }
}
