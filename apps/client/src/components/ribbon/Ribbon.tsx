import { makeStyles } from '@material-ui/styles';
import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

export interface RibbonProps {}

export const Ribbon: LegacyFunctionComponent<RibbonProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.ribbonGroup}>{children}</div>;
};

const useStyles = makeStyles(() => ({
  ribbonGroup: {
    display: 'flex',
    background: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
}));
