import React from 'react';

export type InputWidgetProps = {
  value: string;
};

export const InputWidget = ({ value }: InputWidgetProps) => {
  return <input value={value} />;
};
