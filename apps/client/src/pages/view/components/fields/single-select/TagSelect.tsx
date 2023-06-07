import { LegacyFunctionComponent } from '@shukun/component';
import { MetadataOptions } from '@shukun/schema';
import { Tag } from 'antd';
import React, { FunctionComponent, useMemo } from 'react';

export interface TagSelectProps {
  keyName: string;
  options: MetadataOptions;
}

export const TagSelect: LegacyFunctionComponent<TagSelectProps> = ({
  keyName,
  options,
}) => {
  const option = useMemo(() => {
    return options.find((option) => option.key === keyName);
  }, [keyName, options]);

  return (
    <Tag color={option?.color || 'warning'}>{option?.label || keyName}</Tag>
  );
};
