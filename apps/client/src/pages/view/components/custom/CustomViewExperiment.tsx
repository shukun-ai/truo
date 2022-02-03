import { useObservableState } from 'observable-hooks';
import Postmate from 'postmate';
import queryString from 'query-string';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { UnknownSourceModel } from '../../../../models/source';

import { validAuth$ } from '../../../../services/session';

import {
  POSMATE_IFRAME_CLASS,
  POSTMATE_NAME_VIEW_CUSTOM,
} from '../../../../utils/postmate-helpers';

export interface CustomViewExperimentProps {
  url: string | null;
  sources?: UnknownSourceModel[];
  onFinish?: () => void;
}

export const CustomViewExperiment: FunctionComponent<
  CustomViewExperimentProps
> = ({ url, sources, onFinish }) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const handshakeRef = useRef<Postmate>();
  const location = useLocation();

  useEffect(() => {
    if (!url || handshakeRef.current) {
      return;
    }

    const builtUrl = buildUrl(url ?? '');

    handshakeRef.current = new Postmate({
      container: frameRef.current,
      url: builtUrl,
      name: POSTMATE_NAME_VIEW_CUSTOM,
      classListArray: [POSMATE_IFRAME_CLASS],
    });
  }, [frameRef, url]);

  const auth = useObservableState(validAuth$, null);

  useEffect(() => {
    handshakeRef?.current?.then((child) => child.call('onAuth', auth));
  }, [auth]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    handshakeRef?.current?.then((child) => child.call('onSources', query));
  }, [location]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => child.call('onSources', sources));
  }, [sources]);

  useEffect(() => {
    handshakeRef?.current?.then((child) => {
      if (onFinish) {
        child.on('emitFinish', onFinish);
      }
    });
  }, [onFinish]);

  return (
    <div
      ref={frameRef}
      style={{
        width: '100%',
        height: '100%',
      }}
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
