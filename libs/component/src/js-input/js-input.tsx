import { javascript } from '@codemirror/lang-javascript';
import { ViewUpdate, EditorView } from '@codemirror/view';
import { Box } from '@mantine/core';
import { CodeMode } from '@shukun/schema';

import { useCodeChange } from '../use-code-change/use-code-change';
import { useCodeMirror } from '../use-code-mirror/use-code-mirror';
import { useCodeValue } from '../use-code-value/use-code-value';
import { useCompletionStateRef } from '../use-completion-state-ref/use-completion-state-ref';

import { createJsStateCompletions } from './internal/create-js-state-completions';

export type JsInputProps = {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  completionState?: Record<string, unknown>;
};

export const JsInput = ({
  value,
  onChange,
  completionState = {},
}: JsInputProps) => {
  const { completionStateRef } = useCompletionStateRef(completionState);
  const { handleChange } = useCodeChange(value, onChange, CodeMode.JS);
  const { ref, view } = useCodeMirror([
    javascript(),
    createJsStateCompletions(completionStateRef),
    onUpdate((value) => handleChange(value)),
  ]);
  useCodeValue(value, CodeMode.JS, view);

  return <Box ref={ref}></Box>;
};

const onUpdate = (
  onChange: (value: string, viewUpdate: ViewUpdate) => void,
) => {
  return EditorView.updateListener.of((viewUpdate: ViewUpdate) => {
    if (viewUpdate.docChanged) {
      const doc = viewUpdate.state.doc;
      const value = doc.toString();
      onChange(value, viewUpdate);
    }
  });
};
