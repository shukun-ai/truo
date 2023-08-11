import { ArrayInputs } from '@shukun/component';
import { PresenterEvent } from '@shukun/schema';

import { append, move, update, remove } from '@shukun/util-functions';

import { EventContextProps, EventProvider } from './internal/context';
import { TaskInputs } from './internal/task-inputs';

export type EventInputsProps = {
  value: PresenterEvent[];
  onChange: (newValue: PresenterEvent[]) => void;
  disabled?: boolean;
} & EventContextProps;

export const EventInputs = ({
  value,
  onChange,
  disabled,
  ...contextValue
}: EventInputsProps) => {
  return (
    <EventProvider value={contextValue}>
      <ArrayInputs<PresenterEvent>
        disabled={disabled}
        value={value}
        onUpdate={(index, newValue) => {
          onChange(update(value, index, newValue));
        }}
        onCreate={() => {
          onChange(
            append(value, {
              scope: 'container',
              target: '',
              action: '',
            }),
          );
        }}
        onMove={(sourceIndex, targetIndex) => {
          onChange(move(value, sourceIndex, targetIndex));
        }}
        onRemove={(index) => {
          onChange(remove(value, index));
        }}
        renderItem={(itemValue, itemChange, itemRemove, { drag }) => (
          <TaskInputs
            drag={drag}
            value={itemValue}
            onChange={itemChange}
            onRemove={itemRemove}
          />
        )}
      />
    </EventProvider>
  );
};
