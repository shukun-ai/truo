import { Avatar } from 'antd';
import React, { FunctionComponent } from 'react';

import {
  AttachmentValue,
  getAttachmentUrl,
} from '../../../../../utils/attachment-helpers';

import { AttachmentIcon } from './AttachmentIcon';

export interface AttachmentFieldItemProps {
  attachment: AttachmentValue;
}

export const AttachmentFieldItem: FunctionComponent<
  AttachmentFieldItemProps
> = ({ attachment }) => {
  if (attachment.mime.startsWith('image/')) {
    return <Avatar src={getAttachmentUrl(attachment)} />;
  } else {
    return (
      <Avatar
        style={{ backgroundColor: '#e95f2b' }}
        icon={<AttachmentIcon mime={attachment.mime} />}
      />
    );
  }
};
