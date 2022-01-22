import React, { FunctionComponent } from 'react';

export interface FluidLayoutProps {}

export const FluidLayout: FunctionComponent<FluidLayoutProps> = ({
  children,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: 16,
        paddingTop: 8,
        paddingBottom: 8,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
};
