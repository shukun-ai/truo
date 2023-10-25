import { Select } from '@mantine/core';

import { useNextOptions } from '@shukun/component';

import { SimpleWrapper } from '../simple-wrapper/simple-wrapper';
import { CommonInputProps } from '../types';

export type TaskNameInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
} & CommonInputProps;

export const TaskNameInput = ({
  value,
  onChange,
  ...props
}: TaskNameInputProps) => {
  const currentTaskName = '';
  const { nextOptions } = useNextOptions(currentTaskName);

  return (
    <SimpleWrapper {...props}>
      <Select
        data={nextOptions}
        value={value}
        onChange={(event) => onChange(event ?? undefined)}
        withinPortal
      />
    </SimpleWrapper>
  );
};
