import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Text,
  rem,
  Flex,
  Box,
  useMantineTheme,
  Alert,
  LoadingOverlay,
} from '@mantine/core';
import { OrgBrand } from '@shukun/component';
import { AppProps } from '@shukun/presenter/widget-react';
import { SystemPublicOrgModel } from '@shukun/schema';
import { IconShieldQuestion } from '@tabler/icons-react';

import { useFetchOrg } from './use-fetch-org';
import { useSignInForm } from './use-sign-in-form';

export type SignInScreenProps = {
  app: AppProps;
};

export const SignInScreen = ({ app }: SignInScreenProps) => {
  const org = useFetchOrg(app);

  const theme = useMantineTheme();

  const { classes } = useStyles({ org });

  const { form, handleSubmit, errorMessage, loading } = useSignInForm(app);

  return (
    <Box className={classes.wrapper}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        className={classes.form}
        radius={0}
        p={30}
        pt={100}
      >
        <Box>
          <OrgBrand theme={theme.colorScheme} org={org} />
        </Box>

        <Text className={classes.title} mt="md" mb="md">
          即将登录 {org?.label}
        </Text>

        <Box pos="relative">
          <LoadingOverlay visible={loading} overlayBlur={2} />

          {errorMessage && (
            <Alert icon={<IconShieldQuestion />} color="red" mb="md">
              {errorMessage}
            </Alert>
          )}

          <TextInput
            placeholder="请输入用户名"
            size="md"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            placeholder="请输入密码"
            mt="md"
            size="md"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="xl" mb="xl" size="md">
            登录
          </Button>

          <Flex justify="center">
            <Text fz="xs">如忘记密码，请联系管理员重置</Text>
          </Flex>
        </Box>
      </Paper>
    </Box>
  );
};

const useStyles = createStyles(
  (theme, props: { org?: SystemPublicOrgModel }) => ({
    wrapper: {
      minHeight: rem(900),
      backgroundSize: 'cover',
      background: props?.org?.mainColor
        ? props.org.mainColor
        : 'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      minHeight: rem(900),
      maxWidth: rem(450),

      [theme.fn.smallerThan('sm')]: {
        maxWidth: '100%',
      },
    },

    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  }),
);
