import { PresenterEvent } from '@shukun/schema';

import { ConnectDragSource } from 'react-dnd';

export type TaskInputsProps = {
  drag?: ConnectDragSource;
  value: PresenterEvent;
  onChange: (newValue: PresenterEvent) => void;
  onRemove: () => void;
  disabled?: boolean;
};

export const TaskInputs = ({
  drag,
  value,
  onChange,
  onRemove,
  disabled,
}: TaskInputsProps) => {
  return <div>Box</div>;
};
