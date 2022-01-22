import React, { FunctionComponent } from 'react';

import { Flex } from '../../../components/flex';

export interface BodyProps {}

export const Body: FunctionComponent<BodyProps> = ({ children }) => {
  return (
    <Flex
      data-component={Body.name}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {children}
    </Flex>
  );
};
