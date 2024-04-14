export enum RoutePath {
  HomePage = '/',
  Hub = '/hub',
  Dashboard = '/hub/:orgName',
  SignIn = '/hub/:orgName/sign-in',
  ViewPrefix = '/hub/:orgName/views',
  ViewPage = '/hub/:orgName/views/:viewName',
  ViewCreate = '/hub/:orgName/views/:viewName/create',
  ViewDetail = '/hub/:orgName/views/:viewName/source/:sourceId',
  Plugin = '/hub/:orgName/plugins',
  IframePlayground = '/hub/:orgName/iframe-playground',
}

export const replaceList = [
  RoutePath.Dashboard,
  RoutePath.SignIn,
  RoutePath.ViewPrefix,
  RoutePath.ViewPage,
  RoutePath.ViewCreate,
  RoutePath.ViewDetail,
  RoutePath.Plugin,
  RoutePath.IframePlayground,
];
