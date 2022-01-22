import React, { FunctionComponent, CSSProperties } from 'react';

export interface FlexProps {
  className?: string;
  onClick?: () => void;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flex?: number;
  flexShrink?: number;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
}

export const Flex: FunctionComponent<FlexProps> = ({
  flexDirection,
  flex,
  flexShrink,
  width,
  height,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        flexDirection,
        display: 'flex',
        flex,
        flexShrink,
        width,
        height,
        ...props.style,
      }}
    />
  );
};
