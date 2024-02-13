import { LegacyFunctionComponent } from '@shukun/component';
import {
  PostMessageCustomModeType,
  callChild,
  PostMessageEvent,
  PostMessageAuth,
  PostMessageSearch,
  PostMessageSources,
  PostMessageCustomMode,
  PostMessageEnvironment,
  listenChild,
  PostMessageNotificationProps,
} from '@shukun/postmate';
import { UnknownSourceModel } from '@shukun/schema';
import { message } from 'antd';
import { useObservableState } from 'observable-hooks';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { environment } from '../../../../environments';
import { SearchModel } from '../../../../services/search';
import { validAuth$ } from '../../../../services/session';

export interface CustomViewExperimentProps {
  customMode: PostMessageCustomModeType | null;
  url: string | null;
  search: SearchModel | null;
  sources: UnknownSourceModel[] | null;
  onFinish: () => void;
  onRefresh: () => void;
  onSearch: (search: SearchModel) => void;
  onLoading: (loading: boolean) => void;
  defaultWidth?: string;
  defaultHeight?: string;
}

export const CustomViewExperiment: LegacyFunctionComponent<
  CustomViewExperimentProps
> = ({
  customMode,
  url,
  search,
  sources,
  onFinish,
  onRefresh,
  onSearch,
  onLoading,
  defaultWidth = '100%',
  defaultHeight = '100%',
}) => {
  const sessionId = useId();
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [width, setWidth] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const auth = useObservableState(validAuth$, null);

  const securityUrl = useMemo(() => {
    return url ? addTimeStampForRefresh(buildUrl(url)) : null;
  }, [url]);

  useEffect(() => {
    const cancel = callChild<PostMessageAuth>(
      frameRef.current,
      sessionId,
      PostMessageEvent.ON_AUTH,
      auth,
    );
    return () => cancel();
  }, [auth, sessionId]);

  useEffect(() => {
    const cancel = callChild<PostMessageSearch>(
      frameRef.current,
      sessionId,
      PostMessageEvent.ON_SEARCH,
      search,
    );
    return () => cancel();
  }, [search, sessionId]);

  useEffect(() => {
    const cancel = callChild<PostMessageSources>(
      frameRef.current,
      sessionId,
      PostMessageEvent.ON_SOURCES,
      sources,
    );
    return () => cancel();
  }, [sessionId, sources]);

  useEffect(() => {
    const cancel = callChild<PostMessageCustomMode>(
      frameRef.current,
      sessionId,
      PostMessageEvent.ON_CUSTOM_MODE,
      customMode,
    );
    return () => cancel();
  }, [customMode, sessionId]);

  useEffect(() => {
    const cancel = callChild<PostMessageEnvironment>(
      frameRef.current,
      sessionId,
      PostMessageEvent.ON_ENVIRONMENT,
      {
        serverDomain: environment.VITE_CLIENT_BASE_URL,
        storageDomain: environment.VITE_CLIENT_STORAGE_URL,
        assetDomain: environment.VITE_CLIENT_ASSET_URL,
      },
    );
    return () => cancel();
  }, [customMode, sessionId]);

  useEffect(() => {
    const cancel = listenChild(sessionId, (eventName, payload) => {
      switch (eventName) {
        case PostMessageEvent.EMIT_FINISH:
          onFinish();
          break;
        case PostMessageEvent.EMIT_REFRESH:
          onRefresh();
          break;
        case PostMessageEvent.EMIT_SEARCH:
          onSearch(payload as SearchModel);
          break;
        case PostMessageEvent.EMIT_WIDTH:
          setWidth(payload as string | null);
          break;
        case PostMessageEvent.EMIT_HEIGHT:
          setHeight(payload as string | null);
          break;
        case PostMessageEvent.EMIT_NOTIFICATION:
          // eslint-disable-next-line no-case-declarations
          const props = payload as PostMessageNotificationProps;
          message.open({
            content: props.message,
            type: props.type || 'info',
            duration: props.duration,
          });
          break;
        case PostMessageEvent.EMIT_LOADING:
          onLoading(payload as boolean);
          break;
      }
    });
    return () => cancel();
  }, [onFinish, onLoading, onRefresh, onSearch, sessionId]);

  return (
    <div
      style={{ width: width ?? defaultWidth, height: height ?? defaultHeight }}
    >
      <iframe
        ref={frameRef}
        src={securityUrl ?? ''}
        title="custom view"
        style={{
          border: 'none',
          width: width ?? defaultWidth,
          height: height ?? defaultHeight,
        }}
      />
    </div>
  );
};

const isHttpLink = (value: string) =>
  value.startsWith('https://') || value.startsWith('http://');

const buildUrl = (value: string) => {
  // TODO only allow same origin, same org name and contents from web-engines.
  // TODO bypass the rule if enable develop mode

  if (isHttpLink(value)) {
    return value;
  }

  const slash = value.startsWith('/') ? '' : '/';
  const url = `${window.location.host}${slash}${value}`;

  return url;
};

const addTimeStampForRefresh = (value: string) => {
  return `${value}?iframe-refresh=${new Date().getTime()}`;
};
