import { Select } from '@mantine/core';
import { PresenterEvent, RepositorySchema } from '@shukun/schema';

import { useMemo } from 'react';

import { useEventContext } from './context';

export type TargetInputProps = {
  value: PresenterEvent['target'];
  onChange: (newValue: PresenterEvent['target']) => void;
  scope: RepositorySchema['scope'];
};

export const TargetInput = ({ value, onChange, scope }: TargetInputProps) => {
  const { targetOptions } = useEventContext();

  const allowedTargetOptions = useMemo(() => {
    return [
      {
        label: '--请选择--',
        value: '',
      },
      ...targetOptions,
    ];
  }, [targetOptions]);

  return (
    <Select
      data={allowedTargetOptions}
      label="选择数据仓库"
      withAsterisk
      value={value}
      onChange={onChange}
      withinPortal
    />
  );
};
