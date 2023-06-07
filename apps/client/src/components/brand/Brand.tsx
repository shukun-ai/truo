import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { Flex } from '../flex/Flex';

export interface BrandProps {
  theme?: 'light' | 'dark';
  title?: string;
}

export const Brand: LegacyFunctionComponent<BrandProps> = ({
  theme,
  title = 'Shukun System',
}) => {
  return (
    <Flex>
      <div style={{ paddingTop: 4, marginRight: 8 }}>
        <div
          style={{
            display: 'inline-block',
            width: 20,
            height: 20,
            background: 'rgba(55, 169, 92, 1)',
            borderRadius: 10,
          }}
        ></div>
        <div
          style={{
            display: 'inline-block',
            width: 20,
            height: 20,
            background: 'rgba(28, 82, 108, 1)',
            borderRadius: 10,
            marginLeft: -8,
          }}
        ></div>
      </div>
      <div
        style={{
          borderRadius: 8,
          color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
          fontSize: 14,

          paddingTop: 4,
        }}
      >
        {title}
      </div>
    </Flex>
  );
};
