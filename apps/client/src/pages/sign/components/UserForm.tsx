import { QuestionCircleOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { Button, Input, message, Form, Alert } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

import { globalService, org$ } from '../../../services/global';
import { sessionService } from '../../../services/session';
import { replaceOrgPath, RoutePath } from '../../../utils/history-provider';
import { OrgBrand } from '../../app/OrgBrand';

export interface UserFormProps {}

export interface UserFormModel {
  username: string;
  password: string;
}

export const UserForm: LegacyFunctionComponent<UserFormProps> = () => {
  const navigate = useNavigate();

  const { orgName } = useParams<{ orgName: string }>();

  const org = useObservableState(org$);

  const [errorMessage, setErrorMessage] = useState<string>();

  const handleFinish = useCallback<
    (values: UserFormModel) => Promise<boolean | void>
  >(
    async (values) => {
      if (!orgName) {
        throw new Error('Did not get orgName.');
      }
      try {
        await sessionService.signIn({ ...values, orgName });
        message.success('登录成功');
        navigate(replaceOrgPath(RoutePath.Dashboard, orgName));
      } catch (error: any) {
        const message = error?.response?.data?.message;
        if (typeof message === 'string') {
          setErrorMessage(message);
        } else if (Array.isArray(message)) {
          setErrorMessage(message.join(', '));
        } else if (error?.message) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('发生异常错误');
        }
        throw error;
      }
    },
    [navigate, orgName],
  );

  useEffect(() => {
    if (orgName) {
      globalService.fetchOrg(orgName).catch((error) => {
        navigate(RoutePath.Hub);
      });
    }
  }, [orgName, navigate]);

  return (
    <>
      <Helmet>
        <title>{org?.label || 'Intelligent System'}</title>
      </Helmet>
      <div style={{ marginBottom: 24 }}>
        <OrgBrand theme="light" />
      </div>
      <div style={{ fontSize: 14, marginBottom: 32 }}>
        {org ? `即将登录 ${org.label}` : ''}
      </div>
      {errorMessage && (
        <Alert
          showIcon
          icon={<QuestionCircleOutlined style={{ fontSize: '2em' }} />}
          message={errorMessage}
          type="error"
          style={{ marginBottom: 16 }}
        />
      )}
      <Form<UserFormModel> onFinish={handleFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" block htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 12 }}
      >
        <Button type="link" size="small">
          忘记密码？
        </Button>
      </div>
    </>
  );
};
