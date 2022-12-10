import { QueryFilterBasicValue, ViewSearch } from '@shukun/schema';

export interface SearchModel {
  viewName: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  filter: SearchFilter | null;
  sort: SearchSort | null;
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

export type SearchSort = NonNullable<ViewSearch['sort']>;
