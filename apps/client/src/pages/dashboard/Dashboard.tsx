import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { Flex } from '../../components/flex';
import { BlankTip } from '../../components/layout/BlankTip';
import { FluidLayout } from '../layout/FluidLayout';

export interface DashboardProps {}

export const Dashboard: LegacyFunctionComponent<DashboardProps> = () => {
  return (
    <FluidLayout>
      <Flex style={{ flexDirection: 'column' }}>
        <BlankTip
          title="您好"
          message="欢迎使用"
          description="点击左侧选择操作菜单"
        />
      </Flex>
    </FluidLayout>
  );
};
