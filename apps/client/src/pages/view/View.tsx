import React, { FunctionComponent } from 'react';

import { CustomModal } from './components/custom/CustomModal';

import { ReferenceModal } from './components/reference/ReferenceModal';
import { ViewFactory } from './ViewFactory';

export interface ViewProps {}

export const View: FunctionComponent<ViewProps> = () => {
  return (
    <>
      <ViewFactory />
      <ReferenceModal />
      <CustomModal />
    </>
  );
};
