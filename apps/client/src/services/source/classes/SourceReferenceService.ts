import { RestfulRequestService } from '@shukun/api';
import { MetadataSchema, RoleResourceType } from '@shukun/schema';

import { UnknownSourceModel } from '../../../models/source';
import { httpRequestService } from '../../../utils/http-helper';

import { ReferenceUtil } from './ReferenceUtil';
import { SourceService } from './SourceService';

export class SourceReferenceService {
  private readonly sourceService: SourceService;
  private readonly referenceUtil: ReferenceUtil;

  constructor(sourceService: SourceService, referenceUtil: ReferenceUtil) {
    this.sourceService = sourceService;
    this.referenceUtil = referenceUtil;
  }

  async fetchReferences(
    metadata: MetadataSchema,
    sources: UnknownSourceModel[],
  ) {
    const referenceMaps = this.referenceUtil.getReferenceMap(metadata, sources);

    referenceMaps.forEach(async (referenceMap) => {
      const { referenceTo, foreignName, ids } = referenceMap;

      if (ids.length === 0) {
        return;
      }

      const request = new RestfulRequestService<UnknownSourceModel>(
        httpRequestService,
        {
          atomName: referenceTo,
        },
      );

      const response = await request.findMany(
        { filter: { _id: { $in: ids } } },
        { [foreignName]: true },
      );

      console.log('response', response.data.value);

      this.sourceService.add(
        referenceTo,
        response.data.value as unknown as any,
      );
    });
  }
}
