import { CODE_MODE_JS_PREFIX } from '@shukun/widget';
import { useCallback, useMemo } from 'react';

export const useJsInputProps = ({
  value,
  onChange,
  ...props
}: {
  value: string | undefined;
  onChange: (value: string) => void;
  [k: string]: unknown;
}) => {
  const parsedValue = useMemo(() => {
    if (!value) {
      return '';
    }
    if (!value.startsWith(CODE_MODE_JS_PREFIX)) {
      return '';
    }
    return value.substring(CODE_MODE_JS_PREFIX.length, value.length);
  }, [value]);

  const handleChange = useCallback((value: string) => {
    if (!value) {
      return undefined;
    }
    return `${CODE_MODE_JS_PREFIX}${value}`;
  }, []);

  return {
    props,
    value: parsedValue,
    onChange: handleChange,
  };
};
