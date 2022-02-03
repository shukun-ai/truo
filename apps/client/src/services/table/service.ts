import { MetadataSchema, ViewSchema } from '@shukun/schema';

import { MetadataRequest } from '../../utils/axios';
import { FilterService, filterService } from '../filter';
import { sourceReferenceService } from '../source';
import { SourceReferenceService } from '../source/classes/SourceReferenceService';

import { formatSortToQueryString } from './helper';
import { tableStore } from './store';

class TableService {
  constructor(
    private readonly filterService: FilterService,
    private readonly sourceReferenceService: SourceReferenceService,
  ) {}

  async findMany(view: ViewSchema, metadata: MetadataSchema) {
    tableStore.setLoading(true);

    const filterValues = this.filterService.getFilterByViewName(view.name);
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
      this.filterService.updateTotalCount(count);
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
  filterService,
  sourceReferenceService,
);
