import { Model } from 'postmate';
import { BehaviorSubject } from 'rxjs';
import {
  EMIT_SEARCH,
  EMIT_FINISH,
  EMIT_HEIGHT,
  EMIT_REFRESH,
  EMIT_WIDTH,
  ON_AUTH,
  ON_SEARCH,
  ON_QUERY,
  ON_SOURCES,
} from './post-message.constant';
import { Auth, Search, Query, Sources } from './post-message.interface';

export class PostMessageService {
  protected handshake: Model;

  public auth$ = new BehaviorSubject<Auth>(null);

  /**
   * @deprecated
   */
  public query$ = new BehaviorSubject<Query>(null);

  public sources$ = new BehaviorSubject<Sources>(null);

  public search$ = new BehaviorSubject<Search>(null);

  constructor() {
    this.handshake = new Model({
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
    });
  }

  public async emitFinish(message: string) {
    const parent = await this.handshake;
    parent.emit(EMIT_FINISH, message);
  }

  public async emitRefresh() {
    const parent = await this.handshake;
    parent.emit(EMIT_REFRESH);
  }

  public async emitSearch(search: Search) {
    const parent = await this.handshake;
    parent.emit(EMIT_SEARCH, search);
  }

  public async emitWidth(width: string) {
    const parent = await this.handshake;
    parent.emit(EMIT_WIDTH, width);
  }

  public async emitHeight(height: string) {
    const parent = await this.handshake;
    parent.emit(EMIT_HEIGHT, height);
  }
}
