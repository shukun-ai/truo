export type RouterMap = {
  home: '/editor';
  dashboard: '/editor/:orgName/dashboard';
  dashboardSystem: '/editor/:orgName/dashboard/system';
  presenter: '/editor/:orgName/presenter/:presenterName';
  connector: '/editor/:orgName/connector/:connectorName';
  system: '/editor/:orgName/system';
};

export const routerMap: RouterMap = {
  home: '/editor',
  dashboard: '/editor/:orgName/dashboard',
  dashboardSystem: '/editor/:orgName/dashboard/system',
  presenter: '/editor/:orgName/presenter/:presenterName',
  connector: '/editor/:orgName/connector/:connectorName',
  system: '/editor/:orgName/system',
};
