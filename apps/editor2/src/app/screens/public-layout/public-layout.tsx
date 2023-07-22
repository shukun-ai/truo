import { useObservableState } from 'observable-hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppContext } from '../../contexts/app-context';
import { routerMap } from '../../router-map';

export const PublicLayout = ({ children }: { children: ReactNode }) => {
  const app = useAppContext();

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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
};
