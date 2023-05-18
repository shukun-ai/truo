import { createBrowserRouter } from 'react-router-dom';

import { routerMap } from './router-map';
import { DashboardContainer } from './screens/dashboard/dashboard.container';
import { HomeContainer } from './screens/home/home.container';

export const router = createBrowserRouter([
  {
    path: routerMap.home,
    element: <HomeContainer />,
  },
  {
    path: routerMap.dashboard,
    element: <DashboardContainer />,
  },
]);
