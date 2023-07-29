import { getErrorMessage } from '@shukun/api';
import { useState } from 'react';

import { Hub } from '../../components/hub/hub.container';
import { SignInForm } from '../../components/hub/internal/sign-in-form';
import { useAppContext } from '../../contexts/app-context';
import { useRouteOrgName } from '../../hooks/use-route-org-name';

export type SignInProps = {
  //
};

export const SignIn = () => {
  const app = useAppContext();
  const orgName = useRouteOrgName();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Hub>
      <SignInForm
        loading={loading}
        errorMessage={errorMessage}
        onSubmit={async (value) => {
          try {
            setLoading(true);
            await app.repositories.authRepository.signIn({
              orgName,
              ...value,
            });
          } catch (error) {
            setErrorMessage(getErrorMessage(error));
          } finally {
            setLoading(false);
          }
        }}
      />
    </Hub>
  );
};
