import React from 'react';

export type TextWidgetProps = {
  value: string;
};

export const TextWidget = ({ value }: TextWidgetProps) => {
  return <div>{value}</div>;
};
