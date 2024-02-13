import { BehaviorSubject } from 'rxjs';

import {
  IPostMessageService,
  PostMessageEvent,
  PostMessageNotificationProps,
  PostMessageSessionId,
} from './post-message.interface';

import {
  PostMessageAuth,
  PostMessageCustomMode,
  PostMessageEnvironment,
  PostMessageSearch,
  PostMessageSources,
} from './post-message.interface';

export class PostMessageService implements IPostMessageService {
  protected _sessionId$ = new BehaviorSubject<PostMessageSessionId>(null);

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
    if (!window) {
      return;
    }

    const listener = (event: MessageEvent) => {
      if (event.data?.type !== 'application/x-shukun-v1+json') {
        return;
      }
      if (!event.data?.sessionId) {
        return;
      }

      this._sessionId$.next(event.data.sessionId);

      switch (event.data?.eventName) {
        case PostMessageEvent.ON_AUTH:
          this._auth$.next(event.data.payload);
          break;
        case PostMessageEvent.ON_SOURCES:
          this._sources$.next(event.data.payload);
          break;
        case PostMessageEvent.ON_SEARCH:
          this._search$.next(event.data.payload);
          break;
        case PostMessageEvent.ON_CUSTOM_MODE:
          this._customMode$.next(event.data.payload);
          break;
        case PostMessageEvent.ON_ENVIRONMENT:
          this._environment$.next(event.data.payload);
          break;
      }
    };

    window.addEventListener('message', listener, false);
  }

  private postMessageToParent(eventName: PostMessageEvent, payload: unknown) {
    if (!window?.parent) {
      return;
    }
    const sessionId = this._sessionId$.getValue();
    if (!sessionId) {
      return;
    }
    window.parent.postMessage(
      {
        type: 'application/x-shukun-v1+json',
        eventName,
        payload,
        sessionId,
      },
      '*',
    );
  }

  public getAuth() {
    return this._auth$.getValue();
  }

  public getSources() {
    return this._sources$.getValue();
  }

  public getSearch() {
    return this._search$.getValue();
  }

  public getCustomMode() {
    return this._customMode$.getValue();
  }

  public getEnvironment() {
    return this._environment$.getValue();
  }

  public async emitFinish() {
    this.postMessageToParent(PostMessageEvent.EMIT_FINISH, null);
  }

  public async emitRefresh() {
    this.postMessageToParent(PostMessageEvent.EMIT_REFRESH, null);
  }

  public async emitSearch(search: PostMessageSearch) {
    this.postMessageToParent(PostMessageEvent.EMIT_SEARCH, search);
  }

  public async emitWidth(width: string | null) {
    this.postMessageToParent(PostMessageEvent.EMIT_WIDTH, width);
  }

  public async emitHeight(height: string | null) {
    this.postMessageToParent(PostMessageEvent.EMIT_HEIGHT, height);
  }

  public async emitNotification(props: PostMessageNotificationProps) {
    this.postMessageToParent(PostMessageEvent.EMIT_NOTIFICATION, props);
  }

  public async emitLoading(loading: boolean) {
    this.postMessageToParent(PostMessageEvent.EMIT_LOADING, loading);
  }
}
