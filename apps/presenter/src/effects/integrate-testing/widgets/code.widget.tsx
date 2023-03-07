import React from 'react';

export type CodeWidgetProps = {
  value: string;
};

export const CodeWidget = ({ value }: CodeWidgetProps) => {
  return <div>{JSON.stringify(value)}</div>;
};
