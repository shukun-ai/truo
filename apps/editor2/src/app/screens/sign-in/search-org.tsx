import {
  Alert,
  Button,
  Divider,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconInfoCircle } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Hub } from '../../components/hub/hub.container';
import { useAppContext } from '../../contexts/app-context';
import { useOrgRoute } from '../../hooks/use-org-router';
import { routerMap } from '../../router-map';

export type SearchOrgValue = {
  orgName: string;
};

export const SearchOrg = () => {
  const app = useAppContext();

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const createOrgRoute = useOrgRoute();

  const form = useForm<SearchOrgValue>({
    initialValues: {
      orgName: '',
    },
    validate: zodResolver(
      z.object({
        orgName: z
          .string()
          .min(1, { message: '请输入组织编码' })
          .max(20, { message: '组织编码过长' }),
      }),
    ),
  });

  const handleSubmit = useCallback(
    async (value: SearchOrgValue) => {
      try {
        await app.apiRequester.publicRequester.getOrg(value.orgName);
        navigate(app.routerMap.dashboard.replace(':orgName', value.orgName), {
          replace: true,
        });
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('未知错误，请联系管理员');
        }
      }
    },
    [app.apiRequester.publicRequester, app.routerMap.dashboard, navigate],
  );

  return (
    <Hub>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Title mb={24}>输入您的组织编码</Title>
        <Text mb={24} fz="sm" c="gray">
          您可以联系您的管理员以获取您组织的登录链接。如果您知道您组织的编码，也可以在下面输入组织编码进行查询。
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            placeholder="请输入英文字母的组织编码"
            required
            {...form.getInputProps('orgName')}
            radius="sm"
          />
          <Group mt="lg">
            <Button sx={{ minWidth: 100 }} type="submit" radius="sm">
              查询
            </Button>
            <Divider orientation="vertical" />

            {app.environment.enableRegisteringOrg ? (
              <Button
                variant="subtle"
                color="gray"
                component={Link}
                to={createOrgRoute(routerMap.createOrg)}
              >
                创建新组织
              </Button>
            ) : (
              <Button variant="subtle" color="gray">
                联系管理员以申请新组织
              </Button>
            )}
          </Group>
        </form>
      </Paper>
    </Hub>
  );
};
