import React, { FunctionComponent } from 'react';

export interface PaperProps {}

export const Paper: FunctionComponent<PaperProps> = ({ children }) => {
  return <div style={{ padding: 20 }}>{children}</div>;
};
