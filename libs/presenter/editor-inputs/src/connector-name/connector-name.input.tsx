import { TextInput } from '@mantine/core';

import { SimpleWrapper } from '../simple-wrapper/simple-wrapper';
import { CommonInputProps } from '../types';

export type ConnectorNameInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
} & CommonInputProps;

export const ConnectorNameInput = ({
  value,
  onChange,
  ...props
}: ConnectorNameInputProps) => {
  return (
    <SimpleWrapper {...props}>
      <TextInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </SimpleWrapper>
  );
};
