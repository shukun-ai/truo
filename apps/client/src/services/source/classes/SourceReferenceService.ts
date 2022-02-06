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

    referenceMaps.forEach((referenceMap) => {
      const { referenceTo, foreignName, ids } = referenceMap;

      if (ids.length === 0) {
        return;
      }

      const request = new RestfulRequestService<UnknownSourceModel>(
        httpRequestService,
        {
          resourceType: RoleResourceType.Source,
          urlPath: referenceTo,
          globalSelect: [foreignName],
        },
      );

      request
        .findMany({ filter: { _id: { $in: ids } } })
        .then((response) =>
          this.sourceService.add(referenceTo, response.data.value),
        );
    });
  }
}
