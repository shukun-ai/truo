import React from 'react';

export type ButtonWidgetProps = {
  text: string;
};

export const ButtonWidget = ({ text }: ButtonWidgetProps) => {
  return <button>{text}</button>;
};
