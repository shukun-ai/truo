import { ApiResponseException } from '@shukun/api';
import { message } from 'antd';

import { sessionService } from '../../services/session';
import { replaceOrgPath, RoutePath, history } from '../history-provider';

export function registerExceptionListeners() {
  window.addEventListener('error', (event) => {
    return false;
  });

  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      event.promise.catch((error) => {
        handleHttpException(error);
      });
    },
  );
}

function handleHttpException(error: unknown) {
  if (error instanceof ApiResponseException) {
    if (error.status === 401) {
      const orgName = sessionService.getOrgName();
      if (orgName === null) {
        history.push(RoutePath.Hub);
      } else {
        history.push(replaceOrgPath(RoutePath.SignIn, orgName));
      }
      return;
    }

    if (error.status >= 400) {
      const errorMessage = error.message || '网络请求异常';
      message.error({ content: errorMessage, duration: 2000 });
      return;
    }
  }

  console.error(error);
}
