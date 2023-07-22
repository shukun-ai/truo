import {
  IconAffiliate,
  IconApiApp,
  IconAtom,
  IconBook,
  IconCloud,
  IconDatabase,
  IconHome2,
  IconUserCheck,
  IconUsers,
  IconVariable,
} from '@tabler/icons-react';
import { ReactNode } from 'react';

import { useRouteOrgName } from '../../hooks/use-route-org-name';
import { routerMap } from '../../router-map';

export const useMenu = (): {
  label: string;
  children: {
    label: string;
    icon: ReactNode;
    path?: string;
    disabled?: boolean;
  }[];
}[] => {
  const routeOrgName = useRouteOrgName();

  return [
    {
      label: '程序',
      children: [
        {
          label: '前端应用',
          icon: <IconHome2 size="1rem" stroke={1.5} />,
          path: routerMap.dashboard.replace(':orgName', routeOrgName),
        },
        {
          label: '服务器应用',
          icon: <IconCloud size="1rem" stroke={1.5} />,
          path: routerMap.dashboardBackend.replace(':orgName', routeOrgName),
        },
      ],
    },
    {
      label: '数据',
      children: [
        {
          label: '数据库',
          icon: <IconDatabase size="1rem" stroke={1.5} />,
          disabled: true,
        },

        {
          label: 'API 接口',
          icon: <IconApiApp size="1rem" stroke={1.5} />,
          disabled: true,
        },
      ],
    },
    {
      label: '变量',
      children: [
        {
          label: '环境变量',
          icon: <IconVariable size="1rem" stroke={1.5} />,
          disabled: true,
        },
        {
          label: '函数流资源',
          icon: <IconAtom size="1rem" stroke={1.5} />,
          disabled: true,
        },
      ],
    },
    {
      label: '用户',
      children: [
        {
          label: '用户管理',
          icon: <IconUsers size="1rem" stroke={1.5} />,
          disabled: true,
        },
        {
          label: '角色组',
          icon: <IconUserCheck size="1rem" stroke={1.5} />,
          disabled: true,
        },
        {
          label: '部门',
          icon: <IconAffiliate size="1rem" stroke={1.5} />,
          disabled: true,
        },
      ],
    },
    {
      label: '帮助',
      children: [
        {
          label: '使用手册',
          icon: <IconBook size="1rem" stroke={1.5} />,
          disabled: true,
        },
      ],
    },
  ];
};
