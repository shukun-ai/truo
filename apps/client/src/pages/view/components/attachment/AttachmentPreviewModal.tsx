import { LegacyFunctionComponent } from '@shukun/component';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo, useCallback } from 'react';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';

import { getAttachmentUrl } from '../../../../utils/attachment-helpers';

import {
  attachmentPreviewState$,
  closePreviewAttachments,
} from './attachmentPreviewState';

export interface AttachmentPreviewModalProps {}

export const AttachmentPreviewModal: LegacyFunctionComponent<
  AttachmentPreviewModalProps
> = () => {
  const attachmentPreviewState = useObservableState(
    attachmentPreviewState$,
    null,
  );

  const images = useMemo<{ key: string; src: string }[]>(() => {
    if (!attachmentPreviewState) {
      return [];
    }
    return attachmentPreviewState
      .filter((attachment) => attachment.mime.startsWith('image/'))
      .map((attachment) => ({
        key: attachment.path,
        src: getAttachmentUrl(attachment),
      }));
  }, [attachmentPreviewState]);

  const handleClose = useCallback(() => {
    closePreviewAttachments();
  }, []);

  return (
    <PhotoSlider
      images={images}
      visible={!!attachmentPreviewState}
      onClose={handleClose}
    />
  );
};
