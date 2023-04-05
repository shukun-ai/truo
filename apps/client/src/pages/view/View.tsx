import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { AttachmentPreviewModal } from './components/attachment/AttachmentPreviewModal';
import { CustomModal } from './components/custom/CustomModal';
import { ReferenceModal } from './components/reference/ReferenceModal';
import { ViewFactory } from './ViewFactory';

export interface ViewProps {}

export const View: LegacyFunctionComponent<ViewProps> = () => {
  return (
    <>
      <ViewFactory />
      <ReferenceModal />
      <CustomModal />
      <AttachmentPreviewModal />
    </>
  );
};
