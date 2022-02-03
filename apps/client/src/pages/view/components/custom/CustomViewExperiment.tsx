import { useObservableState } from 'observable-hooks';
import Postmate from 'postmate';
import queryString from 'query-string';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UnknownSourceModel } from '../../../../models/source';
import { useUnmount } from 'ahooks';
import { validAuth$ } from '../../../../services/session';

import {
  POSMATE_IFRAME_CLASS,
  POSTMATE_NAME_VIEW_CUSTOM,
} from '../../../../utils/postmate-helpers';

const ON_AUTH = 'onAuth';
const ON_QUERY = 'onQuery';
const ON_SOURCES = 'onSources';
const EMIT_FINISH = 'emitFinish';
const EMIT_REFRESH = 'emitRefresh';
const EMIT_FILTER = 'emitFilter';
const EMIT_WIDTH = 'emitWidth';
const EMIT_HEIGHT = 'emitHeight';

export interface CustomViewExperimentProps {
  url: string | null;
  sources: UnknownSourceModel[];
  onFinish: (() => void) | null;
  onRefresh: (() => void) | null;
  onFilter: (() => void) | null;
}

export const CustomViewExperiment: FunctionComponent<
  CustomViewExperimentProps
> = ({ url, sources, onFinish, onRefresh, onFilter }) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const handshakeRef = useRef<Postmate>();
  const urlRef = useRef<string | null>(null);
  const location = useLocation();
  const [width, setWidth] = useState<string>('100%');
  const [height, setHeight] = useState<string>('100%');

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

  const auth = useObservableState(validAuth$, null);

  useEffect(() => {
    handshakeRef?.current?.then((child) => child.call(ON_AUTH, auth));
  }, [auth]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    handshakeRef?.current?.then((child) => child.call(ON_QUERY, query));
  }, [location]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => child.call(ON_SOURCES, sources));
  }, [sources]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => {
      if (onFinish) {
        child.on(EMIT_FINISH, onFinish);
      }
    });
  }, [onFinish]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => {
      if (onRefresh) {
        child.on(EMIT_REFRESH, onRefresh);
      }
    });
  }, [onRefresh]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => {
      if (onFilter) {
        child.on(EMIT_FILTER, onFilter);
      }
    });
  }, [onFilter]);

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
