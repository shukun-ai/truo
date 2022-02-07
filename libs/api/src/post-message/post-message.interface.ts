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

export enum PostMessageCustomModeType {
  Page = 'Page',
  TableAction = 'TableAction',
  TableModal = 'TableModal',
  DetailTab = 'DetailTab',
  DetailModal = 'DetailModal',
}

export enum PostMessageEvent {
  ON_AUTH = 'ON_AUTH',
  ON_SOURCES = 'ON_SOURCES',
  ON_SEARCH = 'ON_SEARCH',
  ON_CUSTOM_MODE = 'ON_CUSTOM_MODE',
  ON_ENVIRONMENT = 'ON_ENVIRONMENT',
  EMIT_FINISH = 'EMIT_FINISH',
  EMIT_REFRESH = 'EMIT_REFRESH',
  EMIT_SEARCH = 'EMIT_SEARCH',
  EMIT_WIDTH = 'EMIT_WIDTH',
  EMIT_HEIGHT = 'EMIT_HEIGHT',
}

export type PostMessageAuth = AuthModel | null;

export type PostMessageSources = UnknownSourceModel[] | null;

export type PostMessageSearch = Partial<SearchModel> | null;

export type PostMessageCustomMode = PostMessageCustomModeType | null;

export type PostMessageEnvironment = {
  serverDomain: string;
  storageDomain: string;
  assetDomain: string;
} | null;
