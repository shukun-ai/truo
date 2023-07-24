import { useDebouncedValue } from '@mantine/hooks';
import { useEffect } from 'react';

export const useDebounceSave = <T,>(
  formValue: T,
  callback: (debounced: T) => void,
  debouncedTime = 1000,
) => {
  const [debounced, cancel] = useDebouncedValue(formValue, debouncedTime);

  useEffect(() => {
    callback(debounced);
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);
};
