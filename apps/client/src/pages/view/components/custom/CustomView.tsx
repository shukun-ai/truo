import { LegacyFunctionComponent } from '@shukun/component';
import { ViewSchema } from '@shukun/schema';
import Postmate, { ParentAPI } from 'postmate';
import queryString from 'query-string';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { sessionService } from '../../../../services/session';
// import { enableCrossOriginAuth } from "../../../../utils/env-helpers";
import {
  POSTMATE_IFRAME_CLASS,
  POSTMATE_NAME_VIEW_CUSTOM,
} from '../../../../utils/postmate-helpers';
// import { isSameDomain } from "../../../../utils/url-helpers";

export interface CustomViewProps {
  view: ViewSchema;
}

export const CustomView: LegacyFunctionComponent<CustomViewProps> = ({
  view,
}) => {
  const frameRef = useRef(null);
  const childRef = useRef<ParentAPI>();
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (childRef.current) {
        childRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Should destroy last iframe DOM every view value changed.
    if (childRef.current && childRef.current.destroy) {
      childRef.current.destroy();
    }
  }, [view.value]);

  useEffect(() => {
    if (
      frameRef &&
      view.value
      // @todo temporality disable checking.
      // && iframeDomainSameWithParentDomain(view.value)
    ) {
      const auth = sessionService.getSessionValidAuth();
      const { value } = view;
      const url = buildUrl(value);

      const handshake = new Postmate({
        container: frameRef.current,
        url: url,
        name: POSTMATE_NAME_VIEW_CUSTOM,
        classListArray: [POSTMATE_IFRAME_CLASS],
      });

      handshake.then((child: ParentAPI) => {
        childRef.current = child;
        const query = queryString.parse(location.search);
        child.call('onAuth', auth);
        child.call('onQuery', query);
      });
    }
  }, [frameRef, view, location]);

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

// const iframeDomainSameWithParentDomain = (value: string) => {
//   if (enableCrossOriginAuth()) {
//     return true;
//   }
//   if (isHttpLink(value)) {
//     return isSameDomain(window.location.host, value);
//   }
//   return true;
// };

const buildUrl = (value: string) => {
  if (isHttpLink(value)) {
    // TODO if it startsWith http, we should validate whether it is trusted domain.
    return value;
  }

  return value;
};
