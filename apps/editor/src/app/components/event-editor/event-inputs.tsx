import { ArrayInputs } from '@shukun/component';
import { PresenterEvent } from '@shukun/schema';

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
        onChange={(value) => onChange(value)}
        onCreate={() => {
          return {
            scope: 'container',
            target: '',
            action: '',
          } as PresenterEvent;
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
