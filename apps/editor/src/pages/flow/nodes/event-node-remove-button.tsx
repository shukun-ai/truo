import { Button, Popconfirm } from 'antd';
import React, { FunctionComponent } from 'react';

export interface EventNodeRemoveButtonProps {
  onClick: () => void;
}

export const EventNodeRemoveButton: FunctionComponent<
  EventNodeRemoveButtonProps
> = ({ onClick, children }) => {
  return (
    <Popconfirm
      title="Are you sure to remove this event?"
      onConfirm={onClick}
      okText="Yes"
      cancelText="No"
    >
      <Button type="text">{children}</Button>
    </Popconfirm>
  );
};
