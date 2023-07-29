import {
  Alert,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { getErrorMessage } from '@shukun/api';
import {
  isEngineName,
  isNotDoubleUnderscore,
  isStartedWithLowercase,
} from '@shukun/validator';
import { IconInfoCircle } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Hub } from '../../components/hub/hub.container';
import { useAppContext } from '../../contexts/app-context';
import { routerMap } from '../../router-map';

export type CreateOrgValue = {
  name: string;
  label: string;
  username: string;
  password: string;
};

export const CreateOrg = () => {
  const app = useAppContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CreateOrgValue>({
    initialValues: {
      name: '',
      label: '',
      username: '',
      password: '',
    },
    validate: zodResolver(
      z.object({
        name: z
          .string()
          .min(2)
          .max(30)
          .refine(isEngineName, '仅支持小写，不能以 system__ 开头')
          .refine(isStartedWithLowercase, '必须以小写字母开头')
          .refine(isNotDoubleUnderscore, '不支持双下划线'),
        label: z.string().min(2).max(30),
        username: z
          .string()
          .min(2)
          .max(30)
          .refine(isEngineName, '仅支持小写，不能以 system__ 开头'),
        password: z.string().min(6).max(24),
      }),
    ),
  });

  const handleSubmit = useCallback(
    async (value: CreateOrgValue) => {
      setLoading(true);
      try {
        await app.apiRequester.publicRequester.createOrg(value);
        navigate(
          generatePath(app.routerMap.dashboard, { orgName: value.name }),
          {
            replace: true,
          },
        );
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    },
    [app.apiRequester.publicRequester, app.routerMap.dashboard, navigate],
  );

  return (
    <Hub>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Title mb={24}>注册您的项目编码</Title>
        <Text mb={24} fz="sm" c="gray">
          创建新的项目后，您可以为项目创建应用，一个项目可以拥有一个服务端程序和多个前端应用。
        </Text>
        {errorMessage && (
          <Alert
            title="注册失败"
            icon={<IconInfoCircle />}
            color="red"
            mt={-12}
            mb={12}
          >
            {errorMessage}
          </Alert>
        )}
        <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="项目编码"
            placeholder="2-30 位，仅支持小写英文字母、下划线或数字"
            required
            {...form.getInputProps('name')}
            radius="sm"
            mb={8}
          />
          <TextInput
            label="项目显示名称"
            placeholder="2-30 位，建议使用项目目标客户语言进行创建"
            required
            {...form.getInputProps('label')}
            radius="sm"
            mb={8}
          />
          <TextInput
            label="超级管理员账号"
            placeholder="2-30 位，仅支持小写英文字母、下划线或数字"
            required
            {...form.getInputProps('username')}
            radius="sm"
            mb={8}
          />
          <PasswordInput
            label="密码"
            placeholder="6-24 位，建议包含大小写字母、数字和符号"
            required
            {...form.getInputProps('password')}
            radius="sm"
            mb={8}
          />
          <Group mt="lg">
            <Button
              sx={{ minWidth: 100 }}
              type="submit"
              radius="sm"
              loading={loading}
            >
              注册
            </Button>
            <Divider orientation="vertical" />

            <Button
              variant="subtle"
              color="gray"
              component={Link}
              to={generatePath(routerMap.home, {})}
            >
              返回登录组织
            </Button>
          </Group>
        </form>
      </Paper>
    </Hub>
  );
};
