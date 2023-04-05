import { CloseOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { Image } from 'antd';
import React, { FunctionComponent, useMemo } from 'react';
import { createUseStyles } from 'react-jss';

import {
  AttachmentValue,
  getAttachmentUrl,
} from '../../../../../utils/attachment-helpers';

import { AttachmentIcon } from './AttachmentIcon';

export interface AttachmentListItemProps {
  attachment: AttachmentValue;
  onClose: (attachment: AttachmentValue) => void;
}

export const AttachmentListItem: LegacyFunctionComponent<
  AttachmentListItemProps
> = ({ attachment, onClose }) => {
  const classes = useStyles();

  const preview = useMemo(() => {
    if (attachment.mime.startsWith('image/')) {
      return (
        <Image width="100%" height="100%" src={getAttachmentUrl(attachment)} />
      );
    } else {
      return (
        <div className={classes.placeholder}>
          <AttachmentIcon mime={attachment.mime} style={{ fontSize: 48 }} />
        </div>
      );
    }
  }, [attachment, classes.placeholder]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.preview}>{preview}</div>
      <div className={classes.close} onClick={() => onClose(attachment)}>
        <CloseOutlined style={{ fontSize: 12 }} />
      </div>
    </div>
  );
};

const useStyles = createUseStyles(() => ({
  wrapper: {
    position: 'relative',
    marginRight: 4,
    marginBottom: 4,
  },
  preview: {
    width: 82,
    height: 82,
    border: 'solid 1px #eee',
    borderRadius: 4,
  },
  close: {
    position: 'absolute',
    width: 16,
    height: 16,
    background: '#000',
    color: '#fff',
    borderRadius: '50%',
    top: -6,
    right: -6,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
