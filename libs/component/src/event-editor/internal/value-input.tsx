import { PresenterEvent } from '@shukun/schema';

import { CodeInput } from '../../code-input/code-input';

export type ValueInputProps = {
  value: PresenterEvent['value'];
  onChange: (newValue: PresenterEvent['value']) => void;
};

export const ValueInput = ({ value, onChange }: ValueInputProps) => {
  return (
    <CodeInput
      value={value ?? ''}
      onChange={(newValue) => onChange(newValue)}
    />
  );
};
