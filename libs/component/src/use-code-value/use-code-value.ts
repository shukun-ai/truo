import { CodeMode } from '@shukun/schema';
import { EditorView } from 'codemirror';
import { useEffect, useMemo } from 'react';

/**
 * @remark for sync code mirror doc when value is changed
 */
export const useCodeValue = (
  value: string,
  codeMode: CodeMode,
  view: EditorView | undefined,
) => {
  const parsedValue = useMemo(() => {
    return value.startsWith(codeMode)
      ? value.substring(codeMode.length, value.length)
      : '';
  }, [value, codeMode]);

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

  return { parsedValue };
};
