import { LegacyFunctionComponent } from '@shukun/component';
import { ConfigProvider } from 'antd';
import React, { FunctionComponent } from 'react';

import { Routes } from './pages/app/Routes';

export interface AppProps {}

export const App: LegacyFunctionComponent<AppProps> = () => {
  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      <Routes />
    </ConfigProvider>
  );
};
