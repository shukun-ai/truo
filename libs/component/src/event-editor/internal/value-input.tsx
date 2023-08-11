import { javascript } from '@codemirror/lang-javascript';

import { PresenterEvent } from '@shukun/schema';

import { CodeInput } from '../../code-input/code-input';

export type ValueInputProps = {
  value: PresenterEvent['value'];
  onChange: (newValue: PresenterEvent['value']) => void;
};

export const ValueInput = ({ value, onChange }: ValueInputProps) => {
  return (
    <CodeInput
      label="参数"
      extensions={[javascript()]}
      value={value ?? ''}
      onChange={onChange}
    />
  );
};
