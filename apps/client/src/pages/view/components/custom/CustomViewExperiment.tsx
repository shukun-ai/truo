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
} from '@shukun/api';
import { useUnmount } from 'ahooks';
import { useObservableState } from 'observable-hooks';
import Postmate from 'postmate';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
  defaultWidth = '100%',
  defaultHeight = '100%',
}) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const handshakeRef = useRef<Postmate>();
  const urlRef = useRef<string | null>(null);
  const location = useLocation();
  const [width, setWidth] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const auth = useObservableState(validAuth$, null);

  useEffect(() => {
    if (!url || !frameRef) {
      return;
    }

    if (urlRef.current !== url) {
      urlRef.current = url;

      handshakeRef?.current?.then((child) => child.destroy);
      handshakeRef.current = undefined;

      const builtUrl = buildUrl(url);

      handshakeRef.current = new Postmate({
        container: frameRef.current,
        url: builtUrl,
        name: POSTMATE_NAME_VIEW_CUSTOM,
        classListArray: [POSTMATE_IFRAME_CLASS],
      });
    }
  }, [frameRef, url]);

  useUnmount(() => {
    handshakeRef?.current?.then((child) => child.destroy);
    handshakeRef.current = undefined;
  });

  useEffect(() => {
    callChild<PostMessageAuth>(
      handshakeRef?.current,
      PostMessageEvent.ON_AUTH,
      auth,
    );
  }, [auth]);

  useEffect(() => {
    callChild<PostMessageSearch>(
      handshakeRef?.current,
      PostMessageEvent.ON_SEARCH,
      search,
    );
  }, [search]);

  useEffect(() => {
    callChild<PostMessageSources>(
      handshakeRef?.current,
      PostMessageEvent.ON_SOURCES,
      sources,
    );
  }, [sources]);

  useEffect(() => {
    callChild<PostMessageCustomMode>(
      handshakeRef?.current,
      PostMessageEvent.ON_CUSTOM_MODE,
      customMode,
    );
  }, [customMode]);

  useEffect(() => {
    callChild<PostMessageEnvironment>(
      handshakeRef?.current,
      PostMessageEvent.ON_ENVIRONMENT,
      {
        serverDomain: environment.serverDomain,
        storageDomain: environment.storageDomain,
        assetDomain: environment.assetDomain,
      },
    );
  }, [customMode]);

  useEffect(() => {
    listenChild(handshakeRef?.current, PostMessageEvent.EMIT_FINISH, onFinish);
  }, [onFinish]);

  useEffect(() => {
    listenChild(
      handshakeRef?.current,
      PostMessageEvent.EMIT_REFRESH,
      onRefresh,
    );
  }, [onRefresh]);

  useEffect(() => {
    listenChild(handshakeRef?.current, PostMessageEvent.EMIT_SEARCH, onSearch);
  }, [onSearch]);

  useEffect(() => {
    listenChild(
      handshakeRef?.current,
      PostMessageEvent.EMIT_WIDTH,
      (width: string | null) => {
        setWidth(width);
      },
    );
    listenChild(
      handshakeRef?.current,
      PostMessageEvent.EMIT_HEIGHT,
      (height: string | null) => {
        setHeight(height);
      },
    );
  }, []);

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
