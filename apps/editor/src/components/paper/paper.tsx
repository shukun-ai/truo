import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

export interface PaperProps {}

export const Paper: LegacyFunctionComponent<PaperProps> = ({ children }) => {
  return <div style={{ padding: 20 }}>{children}</div>;
};
