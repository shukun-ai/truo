import {
  Alert,
  Anchor,
  Box,
  Button,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { OrgBrand } from '@shukun/component';
import { IconInfoCircle } from '@tabler/icons-react';
import { z } from 'zod';

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
  const theme = useMantineTheme();

  const form = useForm<SignInFormValue>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(
      z.object({
        username: z
          .string()
          .min(1, { message: '请输入用户名' })
          .max(20, { message: '用户名过长' }),
        password: z
          .string()
          .min(6, { message: '密码大于 6 位' })
          .max(20, { message: '密码小于 6 位' }),
      }),
    ),
  });

  return (
    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
      <Box>
        <OrgBrand theme={theme.colorScheme} org={undefined} />
      </Box>
      <Text mb={24} fz="sm" c="gray">
        请输入账号密码登录您的开发平台已开发您组织的项目
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
