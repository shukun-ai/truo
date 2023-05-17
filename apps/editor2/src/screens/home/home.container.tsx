import { Navigate } from 'react-router-dom';

import { routerMap } from '../../app/router-map';

export type HomeContainerProps = {
  //
};

export const HomeContainer = () => {
  return <Navigate to={routerMap.dashboard} replace />;
};
