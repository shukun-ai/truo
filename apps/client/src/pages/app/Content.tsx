import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';

import { designSystem } from '../../utils/design-system';

export interface ContentProps {
  sideBarVisible?: boolean;
}

export const Content: LegacyFunctionComponent<ContentProps> = ({
  sideBarVisible,
  children,
}) => {
  const classes = useStyles();

  return (
    <div
      className={
        sideBarVisible
          ? classes.contentWithSideBar
          : classes.contentWithoutSideBar
      }
    >
      {children}
    </div>
  );
};

const useStyles = createUseStyles(() => ({
  contentWithSideBar: {
    maxWidth: 1400 + designSystem.sideBarWidth * 2,
    margin: '0 auto',
    marginTop: '8px',
    padding: `0 ${designSystem.sideBarWidth + 8}px`,
    [`@media only screen and (max-width: ${
      1400 + designSystem.sideBarWidth - 8
    }px)`]: {
      paddingRight: 8,
    },
  },
  contentWithoutSideBar: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: `0 8px`,
    marginTop: '8px',
  },
}));
