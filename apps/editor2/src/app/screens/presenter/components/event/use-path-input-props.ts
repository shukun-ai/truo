import { useCallback, useState } from 'react';

export const usePathInputProps = ({
  value,
  onChange,
  ...props
}: {
  value: string[] | undefined;
  onChange: (value: string[] | undefined) => void;
  [k: string]: unknown;
}) => {
  const [cacheValue, setCacheValue] = useState<string>(
    createInitialValue(value),
  );

  const handleChange = useCallback(
    (value: string) => {
      setCacheValue(value);
      changeInitialValue(value, onChange);
    },
    [onChange],
  );

  return {
    props,
    value: cacheValue,
    onChange: handleChange,
  };
};

const createInitialValue = (value: string[] | undefined) => {
  if (!value) {
    return '';
  }
  return JSON.stringify(value);
};

const changeInitialValue = (
  value: string,
  onChange: (value: string[] | undefined) => void,
): void => {
  if (!value) {
    return undefined;
  }
  try {
    const path = JSON.parse(value);
    if (isStringArray(path)) {
      onChange(path);
    }
  } catch {
    //
  }
};

const isStringArray = (value: unknown) => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
};
