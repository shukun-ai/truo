import React from 'react';

export type InputWidgetProps = {
  value: string;
  onChange: (payload: unknown) => void;
};

export const InputWidget = ({ value, onChange }: InputWidgetProps) => {
  return (
    <input value={value} onChange={(event) => onChange(event.target.value)} />
  );
};
