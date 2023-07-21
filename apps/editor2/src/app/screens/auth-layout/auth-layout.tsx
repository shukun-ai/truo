import { useObservableState } from 'observable-hooks';

import { Fragment, ReactNode } from 'react';

import { useAppContext } from '../../contexts/app-context';
import { SignIn } from '../sign-in/sign-in';

export type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const app = useAppContext();

  const currentUser = useObservableState(
    app.repositories.authRepository.currentUser$,
    null,
  );

  if (!currentUser) {
    return <SignIn />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <Fragment>{children}</Fragment>;
};
