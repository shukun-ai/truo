import { Dropdown, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { FunctionComponent, useMemo } from 'react';
import { useHistory } from 'react-router';

import { sessionService } from '../../../services/session';
import { RoutePath, useOrgPath } from '../../../utils/history-provider';

export interface UserProfileProps {}

export const UserProfile: FunctionComponent<UserProfileProps> = () => {
  const history = useHistory();

  const signInOrgPath = useOrgPath(RoutePath.SignIn);

  const menu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item
          danger
          onClick={() => {
            history.push(signInOrgPath);
            sessionService.signOut();
          }}
        >
          注销
        </Menu.Item>
      </Menu>
    );
  }, [history, signInOrgPath]);

  return (
    <Dropdown overlay={menu}>
      <Avatar
        size="small"
        style={{ backgroundColor: '#f56a00', cursor: 'pointer' }}
      >
        U
      </Avatar>
    </Dropdown>
  );
};
