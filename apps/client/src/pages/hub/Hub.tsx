import { LegacyFunctionComponent } from '@shukun/component';
import { Button, Form, Input } from 'antd';
import React, { FunctionComponent, useCallback } from 'react';
import { BiSupport } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

import { Flex } from '../../components/flex';
import { designSystem } from '../../utils/design-system';
import { replaceOrgPath, RoutePath } from '../../utils/history-provider';
import { Background } from '../sign/components/Background';

export interface HubProps {}

export interface HubFormModel {
  orgName: string;
}

export const Hub: LegacyFunctionComponent<HubProps> = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleFinish = useCallback<
    (values: HubFormModel) => Promise<boolean | void>
  >(
    async (values) => {
      navigate(replaceOrgPath(RoutePath.SignIn, values.orgName));
    },
    [navigate],
  );

  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowX: 'hidden',
      }}
    >
      <Flex className={classes.coreBox}>
        <div className={classes.formBox}>
          <BiSupport size="3em" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 24, marginBottom: 32 }}>未找到您组织</div>
          <div style={{ marginBottom: 32 }}>
            您可以联系您的管理员以获取您组织的登录链接。如果您知道您组织的编码，也可以在下面输入组织编码进行查询。
          </div>
          <Form<HubFormModel> onFinish={handleFinish}>
            <Form.Item
              name="orgName"
              rules={[
                {
                  required: true,
                  message: '请输入组织编码',
                },
              ]}
            >
              <Input placeholder="请输入英文字母的组织编码" />
            </Form.Item>
            <div>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </div>
          </Form>
        </div>
      </Flex>
      <div className={classes.introBox}>
        <Background />
      </div>
    </Flex>
  );
};

const useStyles = createUseStyles(() => ({
  coreBox: {
    flex: 1,
    minHeight: '100%',
    background: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 48,
    paddingBottom: 96,
  },
  formBox: {
    width: 320,
  },
  introBox: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    minHeight: '100%',
    background: designSystem.headerBackground,
    color: 'rgb(241, 245, 249)',
    overflow: 'hidden',
  },
}));
