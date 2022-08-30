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
} from '@shukun/api';
import { useUnmount } from 'ahooks';
import { message } from 'antd';
import { useObservableState } from 'observable-hooks';
import Postmate from 'postmate';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { environment } from '../../../../environments';
import { UnknownSourceModel } from '../../../../models/source';
import { SearchModel } from '../../../../services/search';
import { validAuth$ } from '../../../../services/session';
import {
  POSTMATE_IFRAME_CLASS,
  POSTMATE_NAME_VIEW_CUSTOM,
} from '../../../../utils/postmate-helpers';

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

export const CustomViewExperiment: FunctionComponent<
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
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [handshake, setHandshake] = useState<Postmate | null>(null);
  const [width, setWidth] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const auth = useObservableState(validAuth$, null);

  useEffect(() => {
    if (!url || !frameRef) {
      return;
    }

    if (frameUrl !== url) {
      setFrameUrl(url);

      handshake?.then((child) => child.destroy());

      const builtUrl = addTimeStampForRefresh(buildUrl(url));
      const newHandshake = new Postmate({
        container: frameRef.current,
        url: builtUrl,
        name: POSTMATE_NAME_VIEW_CUSTOM,
        classListArray: [POSTMATE_IFRAME_CLASS],
      });
      setHandshake(newHandshake);
    }
  }, [frameRef, frameUrl, handshake, url]);

  useUnmount(() => {
    handshake?.then((child) => child.destroy);
  });

  useEffect(() => {
    callChild<PostMessageAuth>(handshake, PostMessageEvent.ON_AUTH, auth);
  }, [auth, handshake]);

  useEffect(() => {
    callChild<PostMessageSearch>(handshake, PostMessageEvent.ON_SEARCH, search);
  }, [handshake, search]);

  useEffect(() => {
    callChild<PostMessageSources>(
      handshake,
      PostMessageEvent.ON_SOURCES,
      sources,
    );
  }, [handshake, sources]);

  useEffect(() => {
    callChild<PostMessageCustomMode>(
      handshake,
      PostMessageEvent.ON_CUSTOM_MODE,
      customMode,
    );
  }, [customMode, handshake]);

  useEffect(() => {
    callChild<PostMessageEnvironment>(
      handshake,
      PostMessageEvent.ON_ENVIRONMENT,
      {
        serverDomain: environment.serverDomain,
        storageDomain: environment.storageDomain,
        assetDomain: environment.assetDomain,
      },
    );
  }, [customMode, handshake]);

  useEffect(() => {
    listenChild(handshake, PostMessageEvent.EMIT_FINISH, onFinish);
  }, [handshake, onFinish]);

  useEffect(() => {
    listenChild(handshake, PostMessageEvent.EMIT_REFRESH, onRefresh);
  }, [handshake, onRefresh]);

  useEffect(() => {
    listenChild(handshake, PostMessageEvent.EMIT_SEARCH, onSearch);
  }, [handshake, onSearch]);

  useEffect(() => {
    listenChild(
      handshake,
      PostMessageEvent.EMIT_WIDTH,
      (width: string | null) => {
        setWidth(width);
      },
    );
    listenChild(
      handshake,
      PostMessageEvent.EMIT_HEIGHT,
      (height: string | null) => {
        setHeight(height);
      },
    );
  }, [handshake]);

  useEffect(() => {
    listenChild(
      handshake,
      PostMessageEvent.EMIT_NOTIFICATION,
      (props: PostMessageNotificationProps) => {
        message.open({
          content: props.message,
          type: props.type || 'info',
          duration: props.duration,
        });
      },
    );
  }, [handshake]);

  useEffect(() => {
    listenChild(handshake, PostMessageEvent.EMIT_LOADING, onLoading);
  }, [handshake, onLoading]);

  return (
    <div
      ref={frameRef}
      style={{ width: width ?? defaultWidth, height: height ?? defaultHeight }}
    />
  );
};

const isHttpLink = (value: string) =>
  value.startsWith('https://') || value.startsWith('http://');

const buildUrl = (value: string) => {
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
