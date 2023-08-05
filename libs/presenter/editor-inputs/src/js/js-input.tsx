import { javascript } from '@codemirror/lang-javascript';
import { ViewUpdate, EditorView } from '@codemirror/view';
import { Box } from '@mantine/core';
import { CODE_MODE_JS_PREFIX } from '@shukun/presenter/definition';
import { useEffect, useMemo } from 'react';

import { useCodeMirror } from '../common/use-code-mirror';

export type JsInputProps = {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};

export const JsInput = ({ value, onChange }: JsInputProps) => {
  const { ref, view } = useCodeMirror([
    javascript(),
    onUpdate((value) => onChange(`${CODE_MODE_JS_PREFIX}${value}`)),
  ]);

  const parsedValue = useMemo(() => {
    return typeof value === 'string' && value.startsWith(CODE_MODE_JS_PREFIX)
      ? value.substring(CODE_MODE_JS_PREFIX.length, value.length)
      : '';
  }, [value]);

  useEffect(() => {
    if (view) {
      const editorValue = view.state.doc.toString();

      if (parsedValue !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: parsedValue || '',
          },
        });
      }
    }
  }, [parsedValue, view]);

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
