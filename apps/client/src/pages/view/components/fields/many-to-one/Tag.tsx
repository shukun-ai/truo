import { LegacyFunctionComponent } from '@shukun/component';
import { Tag as BaseTag } from 'antd';
import React, { FunctionComponent, ReactText } from 'react';

export interface TagProps {
  referenceId: string;
  value: ReactText;
}

export const Tag: LegacyFunctionComponent<TagProps> = ({ value }) => {
  // @todo should add onClick to open a modal to show reference list, but the reference table has some bugs.
  // And we am about to refactor table columns and reference modal.
  return (
    <BaseTag color="processing" style={{ cursor: 'pointer' }}>
      {value}
    </BaseTag>
  );
};
