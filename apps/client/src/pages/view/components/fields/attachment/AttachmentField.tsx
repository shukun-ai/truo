import { Avatar } from 'antd';
import React, { FunctionComponent, useMemo } from 'react';

import { AttachmentValue } from '../../../../../utils/attachment-helpers';
import { ColumnFieldProps } from '../interfaces';

import { AttachmentFieldItem } from './AttachmentFieldItem';

export const AttachmentField: FunctionComponent<ColumnFieldProps> = ({
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

  if (!value || value.length < 1) {
    return <></>;
  }

  return (
    <Avatar.Group>
      {value.map((attachment) => (
        <AttachmentFieldItem key={attachment.path} attachment={attachment} />
      ))}
    </Avatar.Group>
  );
};
