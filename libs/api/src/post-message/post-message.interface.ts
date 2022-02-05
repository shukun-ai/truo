// TODO: should be extract a shared lib
type IDString = string;

// TODO: should be extract a shared lib
interface AuthModel {
  userId: IDString;
  username: string;
  orgName: string;
  orgId: IDString;
  accessToken: string;
  expiresTimestamp: number;
}

// TODO: should be extract a shared lib
interface UnknownSourceModel {
  _id: IDString;
  [name: string]: unknown;
}

// TODO: should be extract a shared lib
interface FilterQueryStringValues {
  [electronName: string]: any;
}

// TODO: should be extract a shared lib
type SortQueryStringType = 'descend' | 'ascend' | null | undefined;

// TODO: should be extract a shared lib
interface SortQueryStringValues {
  [electronName: string]: SortQueryStringType;
}

// TODO: should be extract a shared lib
interface SearchModel {
  viewName: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  filter: FilterQueryStringValues | null;
  sort: SortQueryStringValues | null;
}

export type Auth = AuthModel | null;

export type Query = string | null;

export type Sources = UnknownSourceModel[] | null;

export type Search = Partial<SearchModel> | null;
