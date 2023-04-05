import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

export interface ViewContentProps {}

export const ViewContent: LegacyFunctionComponent<ViewContentProps> = ({
  children,
}) => {
  return (
    <div
      data-component={ViewContent.name}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};
