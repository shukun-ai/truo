import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';

import { designSystem } from '../../utils/design-system';

export interface ContentProps {
  sideBarVisible?: boolean;
}

export const Content: FunctionComponent<ContentProps> = ({
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

const useStyles = makeStyles(() => ({
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
