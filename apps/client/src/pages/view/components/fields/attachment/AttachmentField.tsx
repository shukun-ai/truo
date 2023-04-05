import { LegacyFunctionComponent } from '@shukun/component';
import { Avatar } from 'antd';
import React, { FunctionComponent, useMemo, useCallback } from 'react';

import { AttachmentValue } from '../../../../../utils/attachment-helpers';
import { openPreviewAttachments } from '../../attachment/attachmentPreviewState';
import { ColumnFieldProps } from '../interfaces';

import { AttachmentFieldItem } from './AttachmentFieldItem';

export const AttachmentField: LegacyFunctionComponent<ColumnFieldProps> = ({
  row,
  electronName,
}) => {
  const value = useMemo<AttachmentValue[] | undefined>(() => {
    const value = row?.[electronName];
    if (Array.isArray(value)) {
      return value;
    }
    return;
  }, [electronName, row]);

  const handleClick = useCallback(() => {
    if (value) {
      openPreviewAttachments(value);
    }
  }, [value]);

  if (!value || value.length < 1) {
    return <></>;
  }

  return (
    <div onClick={handleClick}>
      <Avatar.Group>
        {value.map((attachment) => (
          <AttachmentFieldItem key={attachment.path} attachment={attachment} />
        ))}
      </Avatar.Group>
    </div>
  );
};
