import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { Flex } from '../../../../components/flex';

export interface ViewStageProps {}

export const ViewStage: LegacyFunctionComponent<ViewStageProps> = ({
  children,
}) => {
  return (
    <Flex
      data-component={ViewStage.name}
      style={{
        flex: 1,
        height: '100%',
        flexDirection: 'column',
      }}
    >
      {children}
    </Flex>
  );
};
