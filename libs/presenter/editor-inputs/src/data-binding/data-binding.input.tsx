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
  widgetId,
  ...props
}: DataBindingInputProps) => {
  const { state } = useCompletionState(logs, widgetId);

  return (
    <SimpleWrapper {...props}>
      <JsInput
        {...props}
        value={value ?? ''}
        onChange={onChange}
        completionState={state}
      />
    </SimpleWrapper>
  );
};
