import { useEffect, useRef } from 'react';

export const useCompletionStateRef = (
  completionState: Record<string, unknown>,
) => {
  const completionStateRef = useRef<Record<string, unknown>>({});

  useEffect(() => {
    completionStateRef.current = completionState;
  }, [completionState]);

  return { completionStateRef };
};
