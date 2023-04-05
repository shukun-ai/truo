import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

export interface FullLayoutProps {}

export const FullLayout: LegacyFunctionComponent<FullLayoutProps> = ({
  children,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
};
