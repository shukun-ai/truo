import { LegacyFunctionComponent } from '@shukun/component';
import { ConfigProvider } from 'antd';

import { Routes } from './pages/app/Routes';

export interface AppProps {}

export const App: LegacyFunctionComponent<AppProps> = () => {
  return (
    <ConfigProvider
      autoInsertSpaceInButton={false}
      theme={{
        token: {
          colorPrimary: '#4361ee',
          colorInfo: '2196f3',
          colorSuccess: '1abc9c',
          colorError: '#e7515a',
          colorHighlight: '#e7515a',
          colorWarning: '#e2a03f',
          borderRadius: 0,
        },
      }}
    >
      <Routes />
    </ConfigProvider>
  );
};
