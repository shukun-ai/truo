import { Badge, Box, NavLink, Text } from '@mantine/core';
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
import { Link } from 'react-router-dom';

import { useRouteOrgName } from '../../../hooks/use-route-org-name';
import { routerMap } from '../../../router-map';

export const SideBar = () => {
  const routeOrgName = useRouteOrgName();

  return (
    <Box>
      <Text size="xs" c="gray" fw="bold">
        程序
      </Text>
      <NavLink
        label="前端应用"
        icon={<IconHome2 size="1rem" stroke={1.5} />}
        component={Link}
        to={routerMap.dashboard.replace(':orgName', routeOrgName)}
        active
      />
      <NavLink
        label="服务器应用"
        icon={<IconCloud size="1rem" stroke={1.5} />}
        component={Link}
        to={routerMap.dashboardSystem.replace(':orgName', routeOrgName)}
      />
      <Text size="xs" c="gray" fw="bold">
        数据
      </Text>
      <NavLink
        label="数据库"
        icon={<IconDatabase size="1rem" stroke={1.5} />}
        disabled
        rightSection={<Badge>未开放</Badge>}
      />
      <NavLink
        label="API 接口"
        icon={<IconApiApp size="1rem" stroke={1.5} />}
        disabled
        rightSection={<Badge>未开放</Badge>}
      />
      <Text size="xs" c="gray" fw="bold">
        变量
      </Text>
      <NavLink
        label="环境变量"
        icon={<IconVariable size="1rem" stroke={1.5} />}
        disabled
        rightSection={<Badge>未开放</Badge>}
      />
      <NavLink
        label="连接器资源"
        icon={<IconAtom size="1rem" stroke={1.5} />}
        disabled
        rightSection={<Badge>未开放</Badge>}
      />
      <Text size="xs" c="gray" fw="bold">
        用户
      </Text>
      <NavLink
        label="用户管理"
        icon={<IconUsers size="1rem" stroke={1.5} />}
        disabled
        rightSection={<Badge>未开放</Badge>}
      />
      <NavLink
        label="角色组"
        icon={<IconUserCheck size="1rem" stroke={1.5} />}
        disabled
        rightSection={<Badge>未开放</Badge>}
      />
      <NavLink
        label="部门"
        icon={<IconAffiliate size="1rem" stroke={1.5} />}
        disabled
        rightSection={<Badge>未开放</Badge>}
      />
      <Text size="xs" c="gray" fw="bold">
        帮助
      </Text>
      <NavLink
        label="使用手册"
        icon={<IconBook size="1rem" stroke={1.5} />}
        disabled
        rightSection={<Badge>未开放</Badge>}
      />
    </Box>
  );
};
