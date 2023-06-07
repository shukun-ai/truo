import { LegacyFunctionComponent } from '@shukun/component';
import clsx from 'clsx';
import { cloneElement, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

import { RibbonTooltip } from './RibbonTooltip';

export interface RibbonButtonProps {
  name: string;
  label: string;
  color?: string;
  icon?: any;
  disabled?: boolean;
  disabledTip?: string;
  confirmedTip?: string;
  onClick?: () => void | Promise<void>;
}

export const RibbonButton: LegacyFunctionComponent<RibbonButtonProps> = ({
  name,
  label,
  color,
  icon,
  disabled,
  disabledTip,
  confirmedTip,
  onClick,
}) => {
  const classes = useStyles();

  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }
    if (confirmedTip && onClick) {
      const confirmed = window.confirm(confirmedTip);

      if (confirmed) {
        onClick();
      }
    } else if (onClick) {
      onClick();
    }
  }, [confirmedTip, onClick, disabled]);

  return (
    <div className={classes.ribbonButton} onClick={handleClick}>
      <RibbonTooltip
        className={clsx(
          classes.ribbonButtonInner,
          disabled && classes.disabled,
        )}
        disabled={disabled}
        disabledTip={disabledTip}
      >
        {icon && (
          <div className={classes.icon} style={{ color: color }}>
            {cloneElement(icon, { size: '1.2em' })}
          </div>
        )}
        <div className={classes.label} style={{ color: color }}>
          {label}
        </div>
      </RibbonTooltip>
    </div>
  );
};

const useStyles = createUseStyles(() => ({
  ribbonButton: {
    display: 'flex',
    alignItems: 'center',
    '&::after': {
      content: "'|'",
      display: 'block',
      color: '#c2c2c2',
      marginLeft: 4,
      marginRight: 4,
    },
    '&:last-child': {
      '&::after': {
        display: 'none',
      },
    },
  },
  ribbonButtonInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 12px',
    cursor: 'pointer',
    borderRadius: 4,
    transitionDuration: '500ms',
    transitionProperty: 'background',
    '&:hover': {
      background: '#eee',
    },
  },
  disabled: {
    color: '#b5b5b5',
    cursor: 'not-allowed',
    '&:hover': {
      background: 'none',
    },
  },
  icon: {
    marginRight: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
}));
