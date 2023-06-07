import { QuestionCircleOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { Button, Space } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router';

import { Flex } from '../../components/flex';
import { org$ } from '../../services/global';
import { designSystem } from '../../utils/design-system';
import { RoutePath, useOrgPath } from '../../utils/history-provider';

import { UserProfile } from './components/UserProfile';
import { OrgBrand } from './OrgBrand';

export interface HeaderProps {}

export const Header: LegacyFunctionComponent<HeaderProps> = () => {
  const navigate = useNavigate();

  const org = useObservableState(org$);

  const dashboardOrgPath = useOrgPath(RoutePath.Dashboard);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: designSystem.headerHeight,
      }}
    >
      <Flex
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: designSystem.headerHeight,
          background: org?.mainColor
            ? org.mainColor
            : designSystem.headerBackground,
          alignItems: 'center',
          padding: '0 8px',
          zIndex: designSystem.headerZIndex,
        }}
      >
        <Flex style={{ flex: 1, alignItems: 'center' }}>
          <div style={{ width: 202, paddingLeft: 8 }}>
            <OrgBrand theme="dark" onClick={() => navigate(dashboardOrgPath)} />
          </div>
          {/* @todo hide it when you implement search. */}
          {/* <Search /> */}
        </Flex>
        <div>
          <Space>
            <Button
              size="large"
              type="text"
              icon={<QuestionCircleOutlined />}
              style={{ color: '#fff' }}
            ></Button>
            <UserProfile />
          </Space>
        </div>
      </Flex>
    </div>
  );
};
