import { createBrowserRouter } from 'react-router-dom';

import { routerMap } from './router-map';
import { AuthLayout } from './screens/auth-layout/auth-layout';
import { Backend } from './screens/backend/backend';
import { ConnectorContainer } from './screens/connector/connector.container';
import { Dashboard } from './screens/dashboard/dashboard';
import { DashboardBackend } from './screens/dashboard/dashboard-backend';
import { DashboardPresenter } from './screens/dashboard/dashboard-presenter';
import { HomeContainer } from './screens/home/home.container';
import { Editor } from './screens/presenter/presenter.container';

export const router = createBrowserRouter([
  {
    path: routerMap.home,
    element: <HomeContainer />,
  },
  {
    path: routerMap.dashboard,
    element: (
      <AuthLayout>
        <Dashboard />
      </AuthLayout>
    ),
    children: [
      {
        path: routerMap.dashboard + '/',
        element: <DashboardPresenter />,
      },
      {
        path: routerMap.dashboard + '/system',
        element: <DashboardBackend />,
      },
    ],
  },
  {
    path: routerMap.presenter,
    element: (
      <AuthLayout>
        <Editor />
      </AuthLayout>
    ),
  },
  {
    path: routerMap.backend,
    element: (
      <AuthLayout>
        <Backend />
      </AuthLayout>
    ),
  },
  {
    path: routerMap.connector,
    element: <ConnectorContainer />,
  },
]);
