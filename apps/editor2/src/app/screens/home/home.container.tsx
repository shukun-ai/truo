import { useObservableState } from 'observable-hooks';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Hub } from '../../components/hub/hub.container';
import { OrgForm } from '../../components/hub/internal/org-form';
import { useAppContext } from '../../contexts/app-context';
import { routerMap } from '../../router-map';

export type HomeContainerProps = {
  //
};

export const HomeContainer = () => {
  const app = useAppContext();

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const currentUser = useObservableState(
    app.repositories.authRepository.currentUser$,
    null,
  );

  if (currentUser) {
    return (
      <Navigate
        to={routerMap.dashboard.replace(':orgName', currentUser.orgName)}
        replace
      />
    );
  } else {
    return (
      <Hub>
        <OrgForm
          errorMessage={errorMessage}
          onSubmit={async (value) => {
            try {
              await app.apiRequester.publicRequester.getOrg(value.orgName);
              navigate(routerMap.dashboard.replace(':orgName', value.orgName), {
                replace: true,
              });
            } catch (error) {
              if (error instanceof Error) {
                setErrorMessage(error.message);
              } else {
                setErrorMessage('未知错误，请联系管理员');
              }
            }
          }}
        />
      </Hub>
    );
  }
};
