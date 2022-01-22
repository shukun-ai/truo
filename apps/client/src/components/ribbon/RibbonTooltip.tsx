import { Tooltip } from 'antd';
import React, { FunctionComponent } from 'react';

export interface RibbonTooltipProps {
  className: string;
  disabled?: boolean;
  disabledTip?: string;
}

export const RibbonTooltip: FunctionComponent<RibbonTooltipProps> = ({
  className,
  disabled,
  disabledTip,
  children,
}) => {
  if (!disabled || !disabledTip) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tooltip className={className} title={disabledTip}>
      {children}
    </Tooltip>
  );
};
