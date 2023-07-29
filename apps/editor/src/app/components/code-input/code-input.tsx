import { Extension } from '@codemirror/state';
import { ViewUpdate, EditorView } from '@codemirror/view';
import { Box, Input, InputWrapperProps } from '@mantine/core';
import { useEffect, useMemo } from 'react';

import { useCodeMirror } from '../../hooks/use-code-mirror';

export type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  extensions?: Extension[];
} & Omit<InputWrapperProps, 'value' | 'onChange' | 'children'>;

export const CodeInput = ({
  value,
  onChange,
  extensions = [],
  ...props
}: CodeInputProps) => {
  const { ref, view } = useCodeMirror([
    ...extensions,
    onUpdate((value) => onChange(value)),
  ]);

  const parsedValue = useMemo(() => {
    return value;
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

  return (
    <Input.Wrapper {...props}>
      <Box ref={ref}></Box>
    </Input.Wrapper>
  );
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
