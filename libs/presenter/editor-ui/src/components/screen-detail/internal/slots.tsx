import { SelectItem } from '@mantine/core';
import { PresenterScreen } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { AvailableSlots } from './available-slots';
import { Slot } from './slot';

export type SlotsProps = {
  availableSlots: AvailableSlots;
  layout: PresenterScreen['layout'];
  value: PresenterScreen['slots'];
  onChange: (newValue: PresenterScreen['slots']) => void;
  error?: string;
  isEditMode: boolean;
};

export const Slots = ({
  availableSlots,
  layout,
  value,
  onChange,
  error,
  isEditMode,
}: SlotsProps) => {
  const app = useAppContext();

  const allContainers = useObservableState(
    app.repositories.presenterRepository.containerRepository.all$,
    [],
  );

  const containerOptions = useMemo<SelectItem[]>(() => {
    return allContainers.map((container) => ({
      value: container.id,
      label: container.label,
    }));
  }, [allContainers]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {availableSlots?.[layout]?.map((slot) => (
        <Slot
          slot={slot}
          containerOptions={containerOptions}
          value={value?.[slot.name]}
          onChange={(newValue) => {
            if (newValue) {
              onChange({ ...value, [slot.name]: newValue });
            } else {
              const cloned = structuredClone(value);
              delete cloned[slot.name];
              onChange(cloned);
            }
          }}
          error={slot.required && error}
          isEditMode={isEditMode}
        />
      ))}
    </>
  );
};
