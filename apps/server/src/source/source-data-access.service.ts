import { Inject, Injectable } from '@nestjs/common';
import { MetadataSchema } from '@shukun/schema';

import { DatabaseAdaptor } from './adaptor/database-adaptor.interface';
import { MongoAdaptorService } from './adaptor/mongo-adaptor.service';

@Injectable()
export class SourceDataAccessService<Model> {
  @Inject()
  private readonly mongoAdaptorService!: MongoAdaptorService<Model>;

  async getAdaptor(
    orgName: string,
    metadata: MetadataSchema,
  ): Promise<DatabaseAdaptor<Model>> {
    return await this.mongoAdaptorService.initAtom(orgName, metadata);
  }
}
