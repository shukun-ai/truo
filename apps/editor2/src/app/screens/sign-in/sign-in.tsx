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
            setErrorMessage(handleErrorMessage(error));
          } finally {
            setLoading(false);
          }
        }}
      />
    </Hub>
  );
};

const handleErrorMessage = (error: any): string => {
  const message = error?.response?.data?.message;
  if (typeof message === 'string') {
    return message;
  } else if (Array.isArray(message)) {
    return message.join(', ');
  } else if (error?.message) {
    return error.message;
  } else {
    console.error(error);
    return '发生异常错误';
  }
};
