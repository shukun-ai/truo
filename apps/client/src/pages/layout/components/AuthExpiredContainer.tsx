import { useInterval } from 'ahooks';
import dayjs from 'dayjs';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useState } from 'react';

import { expiresDateTime$ } from '../../../services/session';

import { AuthExpiredAlert } from './AuthExpiredAlert';

const RECHECK_SECONDS = 30;

const SHOW_MINUTES = 5;

export interface AuthExpiredContainerProps {}

export const AuthExpiredContainer: FunctionComponent<
  AuthExpiredContainerProps
> = () => {
  const [show, setShow] = useState(false);

  const expiresDateTime = useObservableState(expiresDateTime$, null);

  useInterval(
    () => {
      const expire = dayjs(expiresDateTime);

      if (!expire.isValid()) {
        return;
      }

      const now = dayjs();
      const minutes = expire.diff(now, 'minute');

      if (minutes >= 0 && minutes <= SHOW_MINUTES) {
        setShow(true);
      } else {
        setShow(false);
      }
    },
    1000 * RECHECK_SECONDS,
    { immediate: true },
  );

  if (show) {
    return <AuthExpiredAlert />;
  }

  return null;
};
