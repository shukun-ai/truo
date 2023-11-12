import { createBrowserRouter } from 'react-router-dom';

import { routerMap } from './router-map';
import { AuthLayout } from './screens/auth-layout/auth-layout';
import { ConnectorContainer } from './screens/connector/connector.container';
import { Dashboard } from './screens/dashboard/dashboard';
import { DashboardBackend } from './screens/dashboard/dashboard-backend';
import { DashboardPresenter } from './screens/dashboard/dashboard-presenter';
import { DashboardView } from './screens/dashboard/dashboard-view';
import { Editor } from './screens/editor/editor';
import { PublicLayout } from './screens/public-layout/public-layout';
import { CreateOrg } from './screens/sign-in/create-org';
import { SearchOrg } from './screens/sign-in/search-org';

export const router = createBrowserRouter([
  {
    path: routerMap.home,
    element: (
      <PublicLayout>
        <SearchOrg />
      </PublicLayout>
    ),
  },
  {
    path: routerMap.createOrg,
    element: (
      <PublicLayout>
        <CreateOrg />
      </PublicLayout>
    ),
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
        path: routerMap.dashboard,
        element: <DashboardPresenter />,
      },
      {
        path: routerMap.dashboardBackend,
        element: <DashboardBackend />,
      },
      {
        path: routerMap.dashboardView,
        element: <DashboardView />,
      },
    ],
  },
  {
    path: routerMap.presenter,
    element: (
      <AuthLayout>
        <Editor mode="presenter" />
      </AuthLayout>
    ),
  },
  {
    path: routerMap.editorBackend,
    element: (
      <AuthLayout>
        <Editor mode="system" />
      </AuthLayout>
    ),
  },
  {
    path: routerMap.editorView,
    element: (
      <AuthLayout>
        <Editor mode="system" />
      </AuthLayout>
    ),
  },
  {
    path: routerMap.connector,
    element: <ConnectorContainer />,
  },
]);
