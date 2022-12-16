import { ConfigProvider } from 'antd';
import React, { FunctionComponent } from 'react';

import { Routes } from './pages/app/routes';

export interface AppProps {}

export const App: FunctionComponent<AppProps> = () => {
  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      <Routes />
    </ConfigProvider>
  );
};
