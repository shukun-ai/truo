import { makeStyles } from '@material-ui/styles';
import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { Flex } from '../../components/flex';
import { designSystem } from '../../utils/design-system';

import { Background } from './components/Background';
import { UserForm } from './components/UserForm';

export interface SignInProps {}

export const SignIn: LegacyFunctionComponent<SignInProps> = () => {
  const classes = useStyles();

  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowX: 'hidden',
      }}
    >
      <Flex className={classes.coreBox}>
        <div className={classes.formBox}>
          <UserForm />
        </div>
      </Flex>
      <div className={classes.introBox}>
        <Background />
      </div>
    </Flex>
  );
};

const useStyles = makeStyles(() => ({
  coreBox: {
    flex: 1,
    minHeight: '100%',
    background: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 48,
    paddingBottom: 96,
  },
  formBox: {
    width: 320,
  },
  introBox: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    minHeight: '100%',
    background: designSystem.headerBackground,
    color: 'rgb(241, 245, 249)',
    overflow: 'hidden',
  },
}));
