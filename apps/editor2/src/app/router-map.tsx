export type RouterMap = {
  home: '/editor';
  dashboard: '/editor/:orgName/dashboard';
  presenter: '/editor/:orgName/presenter/:presenterName';
};

export const routerMap: RouterMap = {
  home: '/editor',
  dashboard: '/editor/:orgName/dashboard',
  presenter: '/editor/:orgName/presenter/:presenterName',
};
