import { PresenterEvent } from '@shukun/schema';

import { EventContextProps } from './internal/context';

export type EventInputsProps = {
  value: PresenterEvent;
  onChange: (newValue: PresenterEvent) => void;
  disabled?: boolean;
} & EventContextProps;

export const EventInputs = ({
  value,
  onChange,
  disabled,
  ...contextValue
}: EventInputsProps) => {
  // TODO implement the editor UI
  return <div>Handle event {JSON.stringify(value)}</div>;
};
