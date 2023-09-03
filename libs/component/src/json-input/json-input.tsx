import { json } from '@codemirror/lang-json';
import { ViewUpdate, EditorView } from '@codemirror/view';
import { Box } from '@mantine/core';

import { CodeMode } from '@shukun/schema';
import { useEffect, useMemo, useState } from 'react';

import { useCodeMirror } from '../use-code-mirror/use-code-mirror';

export type JsonInputProps = {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};

export const JsonInput = ({ value, onChange }: JsonInputProps) => {
  const { handleChange } = useHandleChange(value, onChange);

  const { ref, view } = useCodeMirror([
    json(),
    onUpdate((value) => handleChange(`${CodeMode.JSON}${value}`)),
  ]);

  const parsedValue = useMemo(() => {
    return typeof value === 'string' && value.startsWith(CodeMode.JSON)
      ? value.substring(CodeMode.JSON.length, value.length)
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

const useHandleChange = (
  initialValue: string,
  onChange: (newValue: string) => void,
) => {
  const [cache, handleChange] = useState<string>(initialValue);

  useEffect(() => {
    onChange(cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache]);

  return {
    handleChange,
  };
};
