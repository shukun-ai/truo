import { LegacyFunctionComponent } from '@shukun/component';
import { createUseStyles } from 'react-jss';

export interface RibbonProps {}

export const Ribbon: LegacyFunctionComponent<RibbonProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.ribbonGroup}>{children}</div>;
};

const useStyles = createUseStyles(() => ({
  ribbonGroup: {
    display: 'flex',
    background: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
}));
