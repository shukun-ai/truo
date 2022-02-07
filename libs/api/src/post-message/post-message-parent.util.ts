import Postmate from 'postmate';
import { PostMessageEvent } from './post-message.interface';

export function callChild<T>(
  postmate: Postmate | undefined | null,
  event: PostMessageEvent,
  value: T,
) {
  postmate?.then((parent) => parent.call(event, value as T));
}

export function listenChild<T>(
  postmate: Postmate | undefined | null,
  event: PostMessageEvent,
  callback: T,
) {
  postmate?.then((child) => {
    child.on(event, callback as any);
  });
}
