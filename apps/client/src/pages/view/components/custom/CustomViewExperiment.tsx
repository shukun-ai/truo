import { useObservableState } from 'observable-hooks';
import Postmate from 'postmate';
import queryString from 'query-string';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UnknownSourceModel } from '../../../../models/source';
import { useUnmount } from 'ahooks';
import { validAuth$ } from '../../../../services/session';
import { CustomMode } from '@shukun/api';
import {
  POSMATE_IFRAME_CLASS,
  POSTMATE_NAME_VIEW_CUSTOM,
} from '../../../../utils/postmate-helpers';

import {
  ON_AUTH,
  ON_QUERY,
  ON_SOURCES,
  ON_SEARCH,
  EMIT_FINISH,
  EMIT_REFRESH,
  EMIT_SEARCH,
  EMIT_WIDTH,
  EMIT_HEIGHT,
  ON_CUSTOM_MODE,
} from '@shukun/api';
import { SearchModel } from '../../../../services/search';

export interface CustomViewExperimentProps {
  customMode: CustomMode | null;
  url: string | null;
  search: SearchModel | null;
  sources: UnknownSourceModel[] | null;
  onFinish: () => void;
  onRefresh: () => void;
  onSearch: (search: SearchModel) => void;
}

export const CustomViewExperiment: FunctionComponent<
  CustomViewExperimentProps
> = ({ customMode, url, search, sources, onFinish, onRefresh, onSearch }) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const handshakeRef = useRef<Postmate>();
  const urlRef = useRef<string | null>(null);
  const location = useLocation();
  const [width, setWidth] = useState<string>('100%');
  const [height, setHeight] = useState<string>('100%');
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
        classListArray: [POSMATE_IFRAME_CLASS],
      });
    }
  }, [frameRef, url]);

  useUnmount(() => {
    handshakeRef?.current?.then((child) => child.destroy);
    handshakeRef.current = undefined;
  });

  useEffect(() => {
    handshakeRef?.current?.then((child) => child.call(ON_AUTH, auth));
  }, [auth]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    handshakeRef?.current?.then((child) => child.call(ON_QUERY, query));
  }, [location]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => child.call(ON_SEARCH, search));
  }, [search]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => child.call(ON_SOURCES, sources));
  }, [sources]);

  useEffect(() => {
    handshakeRef?.current?.then((child) =>
      child.call(ON_CUSTOM_MODE, customMode),
    );
  }, [customMode]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => {
      child.on(EMIT_FINISH, onFinish);
    });
  }, [onFinish]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => {
      child.on(EMIT_REFRESH, onRefresh);
    });
  }, [onRefresh]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => {
      child.on(EMIT_SEARCH, onSearch);
    });
  }, [onSearch]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => {
      child.on(EMIT_WIDTH, (width: string) => {
        setWidth(width);
      });
      child.on(EMIT_HEIGHT, (height: string) => {
        setHeight(height);
      });
    });
  }, [onFinish]);

  return <div ref={frameRef} style={{ width, height }} />;
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
