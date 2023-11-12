export type RouterMap = {
  home: '/editor';
  createOrg: '/editor/create-org';
  dashboard: '/editor/:orgName/dashboard';
  dashboardBackend: '/editor/:orgName/dashboard/backend';
  dashboardView: '/editor/:orgName/dashboard/view';
  presenter: '/editor/:orgName/presenter/:presenterName';
  connector: '/editor/:orgName/connector/:connectorName';
  editorBackend: '/editor/:orgName/editor/backend';
  editorView: '/editor/:orgName/editor/view';
};

export const routerMap: RouterMap = {
  home: '/editor',
  createOrg: '/editor/create-org',
  dashboard: '/editor/:orgName/dashboard',
  dashboardBackend: '/editor/:orgName/dashboard/backend',
  dashboardView: '/editor/:orgName/dashboard/view',
  presenter: '/editor/:orgName/presenter/:presenterName',
  connector: '/editor/:orgName/connector/:connectorName',
  editorBackend: '/editor/:orgName/editor/backend',
  editorView: '/editor/:orgName/editor/view',
};
