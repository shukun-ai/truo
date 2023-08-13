import { TypeException } from '@shukun/exception';

import { RouterMode, RouterState } from '../../../interfaces/injector';

import { IHistory } from './history.interface';

export const parseLocation = (location: IHistory['location']): RouterState => {
  const { appName, orgName, pageName } = parsePathname(location.pathname);
  return {
    app: appName,
    orgName: orgName,
    page: pageName,
    search: parseHistorySearch(location.search),
    mode: parseHistoryMode(location.search),
  };
};

const parsePathname = (pathname: string) => {
  if (!pathname.startsWith('/presenter/')) {
    throw new TypeException('The pathname should be starts with /presenter/');
  }
  const [, , orgName, appName, pageName] = pathname.split('/');

  if (!orgName || !appName) {
    throw new TypeException('The orgName or appName is not includes in url.');
  }

  const computedPageName = pageName ? pageName : 'home';

  return {
    orgName,
    appName,
    pageName: computedPageName,
  };
};

const parseHistorySearch = (search: string): Record<string, unknown> => {
  const params = new URLSearchParams(search);
  const json = params.get('s');
  if (!json) {
    return {};
  }
  try {
    return JSON.parse(json);
  } catch {
    console.error('search JSON parse wrong.');
    return {};
  }
};

const parseHistoryMode = (search: string): RouterMode => {
  const params = new URLSearchParams(search);
  const mode = params.get('mode') as unknown as RouterMode;

  if (Object.values(RouterMode).includes(mode)) {
    return mode;
  } else {
    return RouterMode.Server;
  }
};
