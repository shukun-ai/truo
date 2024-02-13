export enum RoutePath {
  HomePage = '/',
  Hub = '/hub',
  Dashboard = '/:orgName',
  SignIn = '/:orgName/sign-in',
  ViewPrefix = '/:orgName/views',
  ViewPage = '/:orgName/views/:viewName',
  ViewCreate = '/:orgName/views/:viewName/create',
  ViewDetail = '/:orgName/views/:viewName/source/:sourceId',
  Plugin = '/:orgName/plugins',
  IframePlayground = '/:orgName/iframe-playground',
}

export const replaceList = [
  RoutePath.Dashboard,
  RoutePath.SignIn,
  RoutePath.ViewPrefix,
  RoutePath.ViewPage,
  RoutePath.ViewCreate,
  RoutePath.ViewDetail,
  RoutePath.Plugin,
];
