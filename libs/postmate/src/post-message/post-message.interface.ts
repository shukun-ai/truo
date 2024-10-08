import { HttpQuerySchema, IDString } from '@shukun/schema';
import { Observable } from 'rxjs';

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
interface SearchModel {
  viewName: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  filter: NonNullable<HttpQuerySchema['filter']> | null;
  sort: NonNullable<HttpQuerySchema['sort']> | null;
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
  EMIT_NOTIFICATION = 'EMIT_NOTIFICATION',
  EMIT_LOADING = 'EMIT_LOADING',
}

export type PostMessageSessionId = string | null;

export type PostMessageAuth = AuthModel | null;

export type PostMessageSources = UnknownSourceModel[] | null;

export type PostMessageSearch = Partial<SearchModel> | null;

export type PostMessageCustomMode = PostMessageCustomModeType | null;

export type PostMessageEnvironment = {
  serverDomain: string;
  storageDomain: string;
  assetDomain: string;
} | null;

export type PostMessageNotificationProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
};

export interface IPostMessageService {
  auth$: Observable<PostMessageAuth>;
  sources$: Observable<PostMessageSources>;
  search$: Observable<PostMessageSearch>;
  customMode$: Observable<PostMessageCustomMode>;
  environment$: Observable<PostMessageEnvironment>;
  getAuth(): PostMessageAuth;
  getSources(): PostMessageSources;
  getSearch(): PostMessageSearch;
  getCustomMode(): PostMessageCustomMode;
  getEnvironment(): PostMessageEnvironment;
  emitFinish(): Promise<void>;
  emitRefresh(): Promise<void>;
  emitSearch(search: PostMessageSearch): Promise<void>;
  emitWidth(width: string | null): Promise<void>;
  emitHeight(height: string | null): Promise<void>;
  emitNotification(props: PostMessageNotificationProps): Promise<void>;
  emitLoading(loading: boolean): Promise<void>;
}
