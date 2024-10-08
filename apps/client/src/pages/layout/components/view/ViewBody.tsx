import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { Flex } from '../../../../components/flex';

export interface ViewBodyProps {}

export const ViewBody: LegacyFunctionComponent<ViewBodyProps> = ({
  children,
}) => {
  return (
    <Flex
      data-component={ViewBody.name}
      style={{ flex: 1, width: '100%', overflow: 'hidden' }}
    >
      {children}
    </Flex>
  );
};
