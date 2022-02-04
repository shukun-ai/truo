import { MetadataSchema, ViewSchema } from '@shukun/schema';

import { MetadataRequest } from '../../utils/axios';
import { SearchService, searchService } from '../search';
import { sourceReferenceService } from '../source';
import { SourceReferenceService } from '../source/classes/SourceReferenceService';

import { formatSortToQueryString } from './helper';
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

    const request = new MetadataRequest(metadata);

    const response = await request.findMany({
      filter,
      limit: pageSize,
      skip,
      sort: formatSortToQueryString(sort),
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
