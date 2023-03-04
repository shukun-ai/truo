import { useInterval } from 'ahooks';
import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import { useObservableState } from 'observable-hooks';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { expiresDateTime$, sessionService } from '../../../services/session';
import { RoutePath, useOrgPath } from '../../../utils/history-provider';

export interface AuthExpiredAlertProps {}

export const AuthExpiredAlert: FunctionComponent<
  AuthExpiredAlertProps
> = () => {
  const navigate = useNavigate();

  const signInOrgPath = useOrgPath(RoutePath.SignIn);

  const expiresDateTime = useObservableState(expiresDateTime$, null);

  const [remainingMillisecond, setRemainingMillisecond] = useState(
    1000 * 60 * 5,
  );

  const handleReSignIn = useCallback(() => {
    navigate(signInOrgPath);
    sessionService.signOut();
    window.location.reload();
  }, [navigate, signInOrgPath]);

  useInterval(
    () => {
      const expire = dayjs(expiresDateTime);
      const now = dayjs();

      if (expire.isValid()) {
        const milliseconds = expire.diff(now, 'millisecond');
        setRemainingMillisecond(milliseconds);
      }
    },
    1000,
    { immediate: true },
  );

  const remainingIndicator = useMemo(() => {
    if (remainingMillisecond <= 0) {
      return null;
    }

    if (remainingMillisecond < 1000 * 60 * 1) {
      return Math.ceil(remainingMillisecond / 1000) + ' 秒';
    }

    return Math.ceil(remainingMillisecond / (1000 * 60)) + ' 分';
  }, [remainingMillisecond]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 16px',
        background: '#4361ee',
        color: '#fff',
        zIndex: 9999,
      }}
    >
      <div>
        登录时间即将到期
        {remainingIndicator && <span>，还剩 {remainingIndicator}</span>}
        。到期后需重新登录，如未保存内容到期后将丢失。
        <Button onClick={handleReSignIn} shape="round" size="small">
          立即重新登录
        </Button>
      </div>
      {remainingMillisecond < 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.75)',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 9998,
          }}
        >
          <Card title="用户认证已过期" bordered={false} style={{ width: 480 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p style={{ textAlign: 'center' }}>
                用户认证已过期，请点击如下按钮重新登录
              </p>
              <Button
                onClick={handleReSignIn}
                type="primary"
                shape="round"
                style={{ width: 180 }}
              >
                立即重新登录
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
