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
import { z } from 'zod';

export type OrgFormProps = {
  errorMessage: string | undefined;
  onSubmit: (value: OrgFormValue) => void;
};

type OrgFormValue = {
  orgName: string;
};

export const OrgForm = ({ errorMessage, onSubmit }: OrgFormProps) => {
  const form = useForm<OrgFormValue>({
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

  return (
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
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          placeholder="请输入英文字母的组织编码"
          required
          {...form.getInputProps('orgName')}
        />
        <Group mt="lg">
          <Button sx={{ minWidth: 100 }} type="submit">
            查询
          </Button>
          <Divider orientation="vertical" />
          <Button variant="subtle" color="gray">
            联系管理员以申请新组织
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
