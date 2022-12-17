import React, { FunctionComponent } from 'react';

import { FlowNode } from '../flow-interface';

import { BaseNode } from './base-node';

export const SourceQueryNode: FunctionComponent<FlowNode> = ({ data }) => {
  return (
    <BaseNode
      title={data.eventName}
      width={data.width}
      height={data.height}
      backgroundColor="red"
    >
      <div>
        <div>atom name</div>
        <div>hi</div>
      </div>
    </BaseNode>
  );
};
