export type RouterMap = {
  home: '/editor';
  dashboard: '/editor/:orgName/dashboard';
  dashboardBackend: '/editor/:orgName/dashboard/backend';
  presenter: '/editor/:orgName/presenter/:presenterName';
  connector: '/editor/:orgName/connector/:connectorName';
  backend: '/editor/:orgName/backend';
};

export const routerMap: RouterMap = {
  home: '/editor',
  dashboard: '/editor/:orgName/dashboard',
  dashboardBackend: '/editor/:orgName/dashboard/backend',
  presenter: '/editor/:orgName/presenter/:presenterName',
  connector: '/editor/:orgName/connector/:connectorName',
  backend: '/editor/:orgName/backend',
};
