// TODO Postmate's types is not consistent with export and must set allowSyntheticDefaultImports as true
import Postmate from 'postmate';
import { BehaviorSubject } from 'rxjs';

import { PostMessageEvent } from '..';

import {
  PostMessageAuth,
  PostMessageCustomMode,
  PostMessageEnvironment,
  PostMessageSearch,
  PostMessageSources,
} from './post-message.interface';
import {} from './post-message.interface';

export class PostMessageService {
  protected handshake: Promise<Postmate.ChildAPI>;

  public auth$ = new BehaviorSubject<PostMessageAuth>(null);

  public sources$ = new BehaviorSubject<PostMessageSources>(null);

  public search$ = new BehaviorSubject<PostMessageSearch>(null);

  public customMode$ = new BehaviorSubject<PostMessageCustomMode>(null);

  public environment$ = new BehaviorSubject<PostMessageEnvironment>(null);

  constructor() {
    this.handshake = new Postmate.Model({
      [PostMessageEvent.ON_AUTH]: (value: PostMessageAuth) => {
        this.auth$.next(value);
      },
      [PostMessageEvent.ON_SOURCES]: (value: PostMessageSources) => {
        this.sources$.next(value);
      },
      [PostMessageEvent.ON_SEARCH]: (value: PostMessageSearch) => {
        this.search$.next(value);
      },
      [PostMessageEvent.ON_CUSTOM_MODE]: (value: PostMessageCustomMode) => {
        this.customMode$.next(value);
      },
      [PostMessageEvent.ON_ENVIRONMENT]: (value: PostMessageEnvironment) => {
        this.environment$.next(value);
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

  public async emitWidth(width: string | null) {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_WIDTH, width);
  }

  public async emitHeight(height: string | null) {
    const parent = await this.handshake;
    parent.emit(PostMessageEvent.EMIT_HEIGHT, height);
  }
}
