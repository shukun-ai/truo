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
import { getErrorMessage } from '@shukun/api';
import { IconInfoCircle } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Hub } from '../../components/hub/hub.container';
import { useAppContext } from '../../contexts/app-context';
import { routerMap } from '../../router-map';

export type SearchOrgValue = {
  orgName: string;
};

export const SearchOrg = () => {
  const app = useAppContext();

  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      setLoading(true);
      try {
        await app.apiRequester.publicRequester.getOrg(value.orgName);
        navigate(
          generatePath(app.routerMap.dashboard, { orgName: value.orgName }),
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
            <Button
              sx={{ minWidth: 100 }}
              type="submit"
              radius="sm"
              loading={loading}
            >
              查询
            </Button>
            <Divider orientation="vertical" />

            {app.environment.orgRegisterMode === 'self-create' && (
              <Button
                variant="subtle"
                color="gray"
                component={Link}
                to={generatePath(routerMap.createOrg, {})}
                loading={loading}
              >
                创建新组织
              </Button>
            )}
          </Group>
        </form>
      </Paper>
    </Hub>
  );
};
