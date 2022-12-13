import { ConfigProvider } from 'antd';
import React, { FunctionComponent } from 'react';

import { ChooseDirectory } from './pages/app/ChooseDirectory';

export interface AppProps {}

export const App: FunctionComponent<AppProps> = () => {
  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      {/* <Routes /> */}
      hi
      <ChooseDirectory />
    </ConfigProvider>
  );
};
