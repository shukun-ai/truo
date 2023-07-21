import { createBrowserRouter } from 'react-router-dom';

import { routerMap } from './router-map';
import { AuthLayout } from './screens/auth-layout/auth-layout';
import { ConnectorContainer } from './screens/connector/connector.container';
import { DashboardContainer } from './screens/dashboard/dashboard.container';
import { DashboardLayout } from './screens/dashboard-layout/dashboard-layout';
import { HomeContainer } from './screens/home/home.container';
import { PresenterContainer } from './screens/presenter/presenter.container';

export const router = createBrowserRouter([
  {
    path: routerMap.home,
    element: <HomeContainer />,
  },
  {
    path: routerMap.dashboard,
    element: (
      <AuthLayout>
        <DashboardLayout>
          <DashboardContainer />
        </DashboardLayout>
      </AuthLayout>
    ),
  },
  {
    path: routerMap.presenter,
    element: (
      <AuthLayout>
        <PresenterContainer />
      </AuthLayout>
    ),
  },
  {
    path: routerMap.connector,
    element: <ConnectorContainer />,
  },
]);
