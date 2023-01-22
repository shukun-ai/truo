import { MetadataSchema, ViewSchema } from '@shukun/schema';

import { createSourceRequester } from '../../apis/requester';

import { SearchService, searchService } from '../search';
import { sourceReferenceService } from '../source';
import { SourceReferenceService } from '../source/classes/SourceReferenceService';

import { tableStore } from './store';

class TableService {
  constructor(
    private readonly searchService: SearchService,
    private readonly sourceReferenceService: SourceReferenceService,
  ) {}

  async findMany(view: ViewSchema, metadata: MetadataSchema) {
    tableStore.setLoading(true);

    const filterValues = this.searchService.getSearchByViewName(view.name);
    const { currentPage, pageSize, filter, sort } = filterValues;
    const skip = (currentPage - 1) * pageSize;

    const requester = createSourceRequester(metadata.name);

    const response = await requester.query({
      filter: filter ?? undefined,
      limit: pageSize,
      skip,
      sort: sort ?? undefined,
      count: true,
    });

    tableStore.set(response.data.value);

    const { count } = response.data;

    if (typeof count === 'number') {
      this.searchService.updateSearchTotalCount(count);
    } else {
      throw new Error('Lack of count from http request.');
    }

    await this.sourceReferenceService.fetchReferences(
      metadata,
      response.data.value,
    );

    tableStore.setLoading(false);
  }

  setSelectedIds(ids: string[]) {
    tableStore.setActive(ids);
  }
}

export const tableService = new TableService(
  searchService,
  sourceReferenceService,
);
