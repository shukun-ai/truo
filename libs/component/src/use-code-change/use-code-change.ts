import { CodeMode } from '@shukun/schema';
import { useEffect, useState } from 'react';

export const useCodeChange = (
  initialValue: string,
  onChange: (newValue: string) => void,
  codeMode: CodeMode,
) => {
  const [cache, handleChange] = useState<string>(initialValue);

  useEffect(() => {
    onChange(cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache]);

  return {
    handleChange: (docString: string) =>
      handleChange(`${codeMode}${docString}`),
  };
};
