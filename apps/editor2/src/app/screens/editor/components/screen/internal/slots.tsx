import { Select, SelectItem } from '@mantine/core';
import { PresenterScreen } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { useAppContext } from '../../../../../contexts/app-context';

import { AvailableSlots } from './available-slots';

export type SlotsProps = {
  availableSlots: AvailableSlots;
  layout: PresenterScreen['layout'];
  value: PresenterScreen['slots'];
  onChange: (newValue: PresenterScreen['slots']) => void;
  error?: string;
};

export const Slots = ({
  availableSlots,
  layout,
  value,
  onChange,
  error,
}: SlotsProps) => {
  const app = useAppContext();

  const allContainers = useObservableState(
    app.repositories.presenterRepository.containerRepository.all$,
    [],
  );

  const containerOptions = useMemo<SelectItem[]>(() => {
    return allContainers.map((container) => ({
      value: container.id,
      label: container.containerName,
    }));
  }, [allContainers]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {availableSlots?.[layout]?.map((slot) => (
        <Select
          key={slot.name}
          label={`插槽：${slot.name}`}
          data={containerOptions}
          withAsterisk={slot.required}
          clearable
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
          mb={8}
        />
      ))}
    </>
  );
};
