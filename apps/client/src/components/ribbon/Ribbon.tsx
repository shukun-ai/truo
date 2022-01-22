import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';

export interface RibbonProps {}

export const Ribbon: FunctionComponent<RibbonProps> = ({ children }) => {
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
