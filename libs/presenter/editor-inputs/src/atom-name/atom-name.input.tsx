import { Select } from '@mantine/core';

import { SimpleWrapper } from '../simple-wrapper/simple-wrapper';
import { CommonInputProps } from '../types';

export type AtomNameInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
  atomOptions: { label: string; value: string }[];
} & CommonInputProps;

export const AtomNameInput = ({
  value,
  onChange,
  atomOptions,
  ...props
}: AtomNameInputProps) => {
  return (
    <SimpleWrapper {...props}>
      <Select
        data={atomOptions}
        value={value}
        onChange={(event) => onChange(event ?? undefined)}
        withinPortal
      />
    </SimpleWrapper>
  );
};
