import {
  Alert,
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { SystemPublicOrgModel } from '@shukun/schema';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import { useAppContext } from '../../../contexts/app-context';
import { useRouteOrgName } from '../../../hooks/use-route-org-name';

export type SignInFormProps = {
  loading: boolean;
  errorMessage: string | undefined;
  onSubmit: (value: SignInFormValue) => void;
};

type SignInFormValue = { username: string; password: string };

export const SignInForm = ({
  loading,
  errorMessage,
  onSubmit,
}: SignInFormProps) => {
  const form = useForm<SignInFormValue>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(
      z.object({
        username: z.string().min(1).max(20),
        password: z.string().min(6).max(24),
      }),
    ),
  });

  const org = useOrg();

  return (
    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
      <Group align="baseline" mb={24}>
        <Title order={1}>{org?.label}</Title>
        <Text c="gray" size="sm">
          {org?.name}
        </Text>
      </Group>
      <Text mb={24} fz="sm" c="gray">
        请输入账号密码登录您的开发平台，开始您的项目
      </Text>
      {errorMessage && (
        <Alert
          title="查询失败"
          icon={<IconInfoCircle />}
          color="red"
          mt={-12}
          mb={12}
        >
          {errorMessage}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          placeholder="用户名"
          required
          {...form.getInputProps('username')}
          mb={24}
          radius="sm"
        />
        <PasswordInput
          placeholder="密码"
          required
          {...form.getInputProps('password')}
          radius="sm"
        />
        <Group mt="lg">
          <Button
            sx={{ minWidth: 100 }}
            type="submit"
            radius="sm"
            loading={loading}
          >
            登录
          </Button>
          <Anchor size="xs">忘记密码？</Anchor>
        </Group>
      </form>
    </Paper>
  );
};

const useOrg = () => {
  const app = useAppContext();
  const routeOrgName = useRouteOrgName();

  const [org, setOrg] = useState<SystemPublicOrgModel | null>(null);

  useEffect(() => {
    app.apiRequester.publicRequester.getOrg(routeOrgName).then((response) => {
      setOrg(response.data.value);
    });

    return () => {
      setOrg(null);
    };
  }, [app.apiRequester.publicRequester, routeOrgName]);

  return org;
};
