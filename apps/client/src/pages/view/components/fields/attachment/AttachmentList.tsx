import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent, useCallback } from 'react';

import { Flex } from '../../../../../components/flex';
import { AttachmentValue } from '../../../../../utils/attachment-helpers';

import { AttachmentListItem } from './AttachmentListItem';

export interface AttachmentListProps {
  value: AttachmentValue[] | undefined;
  onRemove: (value: AttachmentValue[]) => void;
}

export const AttachmentList: LegacyFunctionComponent<AttachmentListProps> = ({
  value,
  onRemove,
}) => {
  const handleClose = useCallback<(attachment: AttachmentValue) => void>(
    (attachment) => {
      if (!value) return;

      const index = value.findIndex((item) => item.path === attachment.path);

      if (index >= 0) {
        const newValue = [...value];
        newValue.splice(index, 1);
        onRemove(newValue);
      }
    },
    [value, onRemove],
  );

  return (
    <Flex>
      {value?.map((attachment) => (
        <AttachmentListItem
          key={attachment.path}
          attachment={attachment}
          onClose={handleClose}
        />
      ))}
    </Flex>
  );
};
