import { ConfigProvider } from 'antd';
import React, { FunctionComponent } from 'react';

export interface AppProps {}

export const App: FunctionComponent<AppProps> = () => {
  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      {/* <Routes /> */}
      hi
    </ConfigProvider>
  );
};
