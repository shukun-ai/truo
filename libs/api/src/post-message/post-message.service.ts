// TODO Postmate's types is not consistent with export and must set allowSyntheticDefaultImports as true
import Postmate from 'postmate';
import { BehaviorSubject } from 'rxjs';
import {
  CustomMode,
  EMIT_SEARCH,
  EMIT_FINISH,
  EMIT_HEIGHT,
  EMIT_REFRESH,
  EMIT_WIDTH,
  ON_AUTH,
  ON_SEARCH,
  ON_QUERY,
  ON_SOURCES,
  ON_CUSTOM_MODE,
} from './post-message.constant';
import { Auth, Search, Query, Sources } from './post-message.interface';

export class PostMessageService {
  protected handshake: Promise<Postmate.ChildAPI>;

  public auth$ = new BehaviorSubject<Auth>(null);

  /**
   * @deprecated
   */
  public query$ = new BehaviorSubject<Query>(null);

  public sources$ = new BehaviorSubject<Sources>(null);

  public search$ = new BehaviorSubject<Search>(null);

  public customMode$ = new BehaviorSubject<CustomMode | null>(null);

  constructor() {
    this.handshake = new Postmate.Model({
      [ON_AUTH]: (value: Auth) => {
        this.auth$.next(value);
      },
      [ON_QUERY]: (value: Query) => {
        this.query$.next(value);
      },
      [ON_SOURCES]: (value: Sources) => {
        this.sources$.next(value);
      },
      [ON_SEARCH]: (value: Search) => {
        this.search$.next(value);
      },
      [ON_CUSTOM_MODE]: (value: CustomMode | null) => {
        this.customMode$.next(value);
      },
    });
  }

  public async emitFinish() {
    const parent = await this.handshake;
    parent.emit(EMIT_FINISH);
  }

  public async emitRefresh() {
    const parent = await this.handshake;
    parent.emit(EMIT_REFRESH);
  }

  public async emitSearch(search: Search) {
    const parent = await this.handshake;
    parent.emit(EMIT_SEARCH, search);
  }

  public async emitWidth(width: string | null) {
    const parent = await this.handshake;
    parent.emit(EMIT_WIDTH, width);
  }

  public async emitHeight(height: string | null) {
    const parent = await this.handshake;
    parent.emit(EMIT_HEIGHT, height);
  }
}
