// TODO Postmate's types is not consistent with export and must set allowSyntheticDefaultImports as true
import Postmate from 'postmate';
import { BehaviorSubject } from 'rxjs';

import {
  IPostMessageService,
  PostMessageEvent,
  PostMessageNotificationProps,
} from './post-message.interface';

import {
  PostMessageAuth,
  PostMessageCustomMode,
  PostMessageEnvironment,
  PostMessageSearch,
  PostMessageSources,
} from './post-message.interface';
import {} from './post-message.interface';

export class PostMessageService implements IPostMessageService {
  protected handshake: Promise<Postmate.ChildAPI>;

  protected _auth$ = new BehaviorSubject<PostMessageAuth>(null);

  protected _sources$ = new BehaviorSubject<PostMessageSources>(null);

  protected _search$ = new BehaviorSubject<PostMessageSearch>(null);

  protected _customMode$ = new BehaviorSubject<PostMessageCustomMode>(null);

  protected _environment$ = new BehaviorSubject<PostMessageEnvironment>(null);

  public auth$ = this._auth$.asObservable();

  public sources$ = this._sources$.asObservable();

  public search$ = this._search$.asObservable();

  public customMode$ = this._customMode$.asObservable();

  public environment$ = this._environment$.asObservable();

  constructor() {
    this.handshake = new Postmate.Model({
      [PostMessageEvent.ON_AUTH]: (value: PostMessageAuth) => {
        this._auth$.next(value);
      },
      [PostMessageEvent.ON_SOURCES]: (value: PostMessageSources) => {
        this._sources$.next(value);
      },
      [PostMessageEvent.ON_SEARCH]: (value: PostMessageSearch) => {
        this._search$.next(value);
      },
      [PostMessageEvent.ON_CUSTOM_MODE]: (value: PostMessageCustomMode) => {
        this._customMode$.next(value);
      },
      [PostMessageEvent.ON_ENVIRONMENT]: (value: PostMessageEnvironment) => {
        this._environment$.next(value);
      },
    });
  }

  public async emitFinish() {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_FINISH);
  }

  public async emitRefresh() {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_REFRESH);
  }

  public async emitSearch(search: PostMessageSearch) {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_SEARCH, search);
  }

  /**
   * @deprecated Because there is a conflict when there are more than one iframe in a same page.
   */
  public async emitWidth(width: string | null) {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_WIDTH, width);
  }

  /**
   * @deprecated Because there is a conflict when there are more than one iframe in a same page.
   */
  public async emitHeight(height: string | null) {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_HEIGHT, height);
  }

  public async emitNotification(props: PostMessageNotificationProps) {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_NOTIFICATION, props);
  }

  public async emitLoading(loading: boolean) {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_LOADING, loading);
  }
}
