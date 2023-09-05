import {
  IconBinaryTree,
  IconBuildingWarehouse,
  IconCopy,
  IconDatabaseCog,
  IconDots,
  IconEdit,
  IconGizmo,
  IconInfoCircle,
  IconPlus,
  IconSignature,
  IconTrash,
  IconVariable,
} from '@tabler/icons-react';

export const iconsMap = {
  trash: IconTrash,
  rename: IconSignature,
  copy: IconCopy,
  plus: IconPlus,
  more: IconDots,
  info: IconInfoCircle,
  edit: IconEdit,
  activityBarNodes: IconBinaryTree,
  activityBarRepositories: IconBuildingWarehouse,
  activityBarMetadatas: IconDatabaseCog,
  activityBarConnectors: IconGizmo,
  activityBarEnvironments: IconVariable,
} as const;
