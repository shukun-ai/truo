import { JsonInput as BaseJsonInput } from '@shukun/component';

import { SimpleWrapper } from '../simple-wrapper/simple-wrapper';
import { CommonInputProps } from '../types';

export type JsonInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
} & CommonInputProps;

export const JsonInput = ({ value, onChange, ...props }: JsonInputProps) => {
  return (
    <SimpleWrapper {...props}>
      <BaseJsonInput {...props} value={value ?? ''} onChange={onChange} />
    </SimpleWrapper>
  );
};
