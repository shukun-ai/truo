import { javascript } from '@codemirror/lang-javascript';
import { ViewUpdate, EditorView } from '@codemirror/view';
import { Box } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';
import { useEffect, useMemo } from 'react';

import { useCodeMirror } from './use-code-mirror';
import { useWidgetFormContext } from './widget-context';
import { JS_PREFIX } from './widget-input-prefix';

export type WidgetJsInputProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetJsInput = ({ propertyId }: WidgetJsInputProps) => {
  const form = useWidgetFormContext();
  const formProps = form.getInputProps(propertyId);

  const { ref, view } = useCodeMirror([
    javascript(),
    onUpdate((value) => formProps.onChange(`${JS_PREFIX}${value}`)),
  ]);

  const value = useMemo(() => {
    return formProps.value.substring(JS_PREFIX.length, formProps.value.length);
  }, [formProps.value]);

  useEffect(() => {
    if (view) {
      const editorValue = view.state.doc.toString();

      if (value !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value || '',
          },
        });
      }
    }
  }, [value, view]);

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
