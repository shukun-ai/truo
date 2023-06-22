import { Skeleton } from '@mantine/core';
import { useObservableState } from 'observable-hooks';
import { Navigate } from 'react-router-dom';

import { useAppContext } from '../../contexts/app-context';
import { routerMap } from '../../router-map';

export type HomeContainerProps = {
  //
};

export const HomeContainer = () => {
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
    return <Skeleton />;
  }
};
