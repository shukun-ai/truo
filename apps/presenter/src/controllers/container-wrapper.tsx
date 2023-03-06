import React, { ReactElement } from 'react';

export type ContainerWrapperProps = {
  containerId: string;
  children: ReactElement[];
};

export const ContainerWrapper = ({
  containerId,
  children,
}: ContainerWrapperProps) => {
  return <div data-container={containerId}>{children}</div>;
};
