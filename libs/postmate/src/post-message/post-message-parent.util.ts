import { PostMessageEvent } from './post-message.interface';

export function callChild<T>(
  iframe: HTMLIFrameElement | null,
  sessionId: string,
  event: PostMessageEvent,
  value: T,
) {
  const listener = () => {
    iframe?.contentWindow?.postMessage(
      {
        type: 'application/x-shukun-v1+json',
        eventName: event,
        payload: value,
        sessionId,
      },
      '*', // TODO add environment to control the origin target
    );
  };
  iframe?.addEventListener('load', listener);

  return () => {
    iframe?.removeEventListener('load', listener);
  };
}

export function listenChild<T>(
  sessionId: string,
  callback: (eventName: PostMessageEvent, payload: T) => void,
) {
  const listener = (event: MessageEvent) => {
    if (
      event.data?.type === 'application/x-shukun-v1+json' &&
      event.data?.sessionId === sessionId
    ) {
      callback(event.data.eventName, event.data.payload);
    }
  };
  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
}
