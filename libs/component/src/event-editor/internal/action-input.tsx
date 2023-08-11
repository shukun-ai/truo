import { Select, SelectItem } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';

import { useMemo } from 'react';

import { useEventContext } from './context';

export type ActionInputProps = {
  value: PresenterEvent['action'];
  onChange: (newValue: PresenterEvent['action']) => void;
  target: string;
};

export const ActionInput = ({ value, onChange, target }: ActionInputProps) => {
  const { actionOptions } = useEventContext();

  const allowedActionOptions = useMemo<SelectItem[]>(() => {
    return [
      {
        label: '--请选择--',
        value: '',
      },
      ...actionOptions.filter((item) => item.target === target),
    ];
  }, [actionOptions, target]);

  return (
    <Select
      data={allowedActionOptions}
      label="选择方法"
      withAsterisk
      value={value}
      onChange={onChange}
      withinPortal
    />
  );
};
