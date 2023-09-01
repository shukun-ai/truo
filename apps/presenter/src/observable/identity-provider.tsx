import { AppProps } from '../interfaces/app';

import { SignInScreen } from './sign-in/sign-in-screen';

export const IdentityProvider = ({
  children,
  ...app
}: AppProps & { children: JSX.Element }) => {
  if (!app.state.auth.current) {
    return <SignInScreen {...app} />;
  }
  return children;
};
