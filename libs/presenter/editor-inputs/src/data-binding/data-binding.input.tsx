import { JsInput, useCompletionState } from '@shukun/component';

import { SimpleWrapper } from '../simple-wrapper/simple-wrapper';
import { CommonInputProps } from '../types';

export type DataBindingInputProps = {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
} & CommonInputProps;

export const DataBindingInput = ({
  value,
  onChange,
  logs,
  ...props
}: DataBindingInputProps) => {
  const { state } = useCompletionState(logs);

  return (
    <SimpleWrapper logs={logs} {...props}>
      <JsInput
        {...props}
        value={value ?? ''}
        onChange={onChange}
        completionState={state}
      />
    </SimpleWrapper>
  );
};
