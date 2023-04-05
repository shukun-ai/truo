import {
  FileImageOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FilePdfOutlined,
  FileZipOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent, CSSProperties } from 'react';

export interface AttachmentIconProps {
  mime: string;
  style?: CSSProperties;
}

export const AttachmentIcon: LegacyFunctionComponent<AttachmentIconProps> = ({
  mime,
  ...props
}) => {
  if (mime.startsWith('image/')) {
    return <FileImageOutlined {...props} />;
  }

  if (mime.startsWith('video/')) {
    return <VideoCameraOutlined {...props} />;
  }

  if (
    mime === 'application/msword' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <FileWordOutlined {...props} />;
  }

  if (
    mime === 'application/vnd.ms-excel' ||
    mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return <FileExcelOutlined {...props} />;
  }

  if (
    mime === 'application/vnd.ms-powerpoint' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    return <FilePptOutlined {...props} />;
  }

  if (mime === 'application/pdf') {
    return <FilePdfOutlined {...props} />;
  }

  if (mime === 'application/zip' || mime === 'application/x-rar-compressed') {
    return <FileZipOutlined {...props} />;
  }

  return <FileTextOutlined {...props} />;
};
