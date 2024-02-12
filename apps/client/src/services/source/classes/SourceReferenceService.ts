import { MetadataSchema, UnknownSourceModel } from '@shukun/schema';

import { createSourceRequester } from '../../../apis/requester';

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

      const requester = createSourceRequester(referenceTo);

      // TODO 这里的请求数量会存在问题，因为不是为每列平均分配 reference id，所以会产生请求不均匀的问题。
      // 现在的数据是由 ManyToMany 字段一次性返回的，这种方式对大量 ManyToMany 数据将会存在问题，将禁止 ManyToMany 字段返回值。
      // 必须通过接口去获得。
      // Now, we use limit: 0 to get all values to fix temporarily
      const response = await requester.query({
        filter: { _id: { $in: ids } },
        select: { [foreignName]: true },
        limit: 0,
      });

      this.sourceService.add(referenceTo, response.data.value);
    });
  }
}
