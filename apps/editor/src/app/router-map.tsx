export type RouterMap = {
  home: '/editor';
  createOrg: '/editor/create-org';
  dashboard: '/editor/:orgName/dashboard';
  dashboardBackend: '/editor/:orgName/dashboard/backend';
  presenter: '/editor/:orgName/presenter/:presenterName';
  connector: '/editor/:orgName/connector/:connectorName';
  backend: '/editor/:orgName/backend';
};

export const routerMap: RouterMap = {
  home: '/editor',
  createOrg: '/editor/create-org',
  dashboard: '/editor/:orgName/dashboard',
  dashboardBackend: '/editor/:orgName/dashboard/backend',
  presenter: '/editor/:orgName/presenter/:presenterName',
  connector: '/editor/:orgName/connector/:connectorName',
  backend: '/editor/:orgName/backend',
};
