import { Select } from '@mantine/core';

import { SimpleWrapper } from '../simple-wrapper/simple-wrapper';
import { CommonInputProps } from '../types';

export type ConnectorNameInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
  connectorOptions: { label: string; value: string }[];
} & CommonInputProps;

export const ConnectorNameInput = ({
  value,
  onChange,
  connectorOptions,
  ...props
}: ConnectorNameInputProps) => {
  return (
    <SimpleWrapper {...props}>
      <Select
        data={connectorOptions}
        value={value}
        onChange={(event) => onChange(event ?? undefined)}
      />
    </SimpleWrapper>
  );
};
