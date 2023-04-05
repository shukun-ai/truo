import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { Flex } from '../../../components/flex';

export interface StageProps {}

export const Stage: LegacyFunctionComponent<StageProps> = ({ children }) => {
  return (
    <Flex
      data-component={Stage.name}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        flexDirection: 'column',
      }}
    >
      {children}
    </Flex>
  );
};
