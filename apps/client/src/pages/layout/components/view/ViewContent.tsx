import React, { FunctionComponent } from 'react';

export interface ViewContentProps {}

export const ViewContent: FunctionComponent<ViewContentProps> = ({
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
