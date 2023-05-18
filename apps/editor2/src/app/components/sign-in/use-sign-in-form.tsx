import { useForm } from '@mantine/form';
import { useState } from 'react';

import { AppContextProps } from '../../contexts/app-context';

export const useSignInForm = (app: AppContextProps, orgName: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const form = useForm<{ username: string; password: string }>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length < 2 ? '用户名必须大于2位' : null),
      password: (value) => (value.length < 6 ? '用户名必须大于6位' : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      setLoading(true);
      await app.repositories.authRepository.signIn({
        orgName,
        ...values,
      });
    } catch (error) {
      setErrorMessage(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  });

  return { form, handleSubmit, errorMessage, loading };
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
