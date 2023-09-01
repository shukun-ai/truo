import { useForm } from '@mantine/form';
import { useState } from 'react';

import { AppProps } from '../../interfaces/app';

export const useSignInForm = (app: AppProps) => {
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
      const response = await app.injector.api.publicRequester.signIn(
        app.state.router.orgName,
        {
          username: values.username,
          password: values.password,
        },
      );

      app.injector.auth.signIn(response.data.value);
    } catch (error) {
      setErrorMessage(handleErrorMessage(error));
      throw error;
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
