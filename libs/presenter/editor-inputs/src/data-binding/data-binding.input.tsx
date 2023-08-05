import { JsInput } from '../js/js-input';
import { CommonInputProps } from '../types';

export type DataBindingInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
} & CommonInputProps;

export const DataBindingInput = ({
  value,
  onChange,
  ...props
}: DataBindingInputProps) => {
  return <JsInput {...props} value={value ?? ''} onChange={onChange} />;
};
