import { QueryFilterBasicValue } from '@shukun/schema';

import { SortQueryStringValues } from '../table/model';

export interface SearchModel {
  viewName: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  filter: SearchFilter | null;
  sort: SortQueryStringValues | null;
}

export interface SearchFilter {
  [electronName: string]: {
    $eq?: QueryFilterBasicValue;
    $ne?: QueryFilterBasicValue;
    $gt?: QueryFilterBasicValue;
    $gte?: QueryFilterBasicValue;
    $lt?: QueryFilterBasicValue;
    $lte?: QueryFilterBasicValue;
    $in?: QueryFilterBasicValue[];
    $nin?: QueryFilterBasicValue[];
    $like?: string;
  };
}
