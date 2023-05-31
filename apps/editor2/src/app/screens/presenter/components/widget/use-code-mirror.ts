import { Extension } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { useEffect, useRef, useState } from 'react';

export const useCodeMirror = (extensions: Extension[]) => {
  const ref = useRef<any>();
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    const view = new EditorView({
      extensions: [basicSetup, ...extensions],
      parent: ref.current,
    });

    setView(view);

    return () => {
      view.destroy();
      setView(undefined);
    };
  }, []);

  return { ref, view };
};
