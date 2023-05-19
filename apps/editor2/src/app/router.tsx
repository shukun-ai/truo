import { createBrowserRouter } from 'react-router-dom';

import { routerMap } from './router-map';
import { DashboardContainer } from './screens/dashboard/dashboard.container';
import { HomeContainer } from './screens/home/home.container';
import { PresenterContainer } from './screens/presenter/presenter.container';

export const router = createBrowserRouter([
  {
    path: routerMap.home,
    element: <HomeContainer />,
  },
  {
    path: routerMap.dashboard,
    element: <DashboardContainer />,
  },
  {
    path: routerMap.presenter,
    element: <PresenterContainer />,
  },
]);
