import {
  IconBinaryTree,
  IconBuildingWarehouse,
  IconCopy,
  IconDatabaseCog,
  IconDots,
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
  activityBarNodes: IconBinaryTree,
  activityBarRepositories: IconBuildingWarehouse,
  activityBarMetadatas: IconDatabaseCog,
  activityBarConnectors: IconGizmo,
  activityBarEnvironments: IconVariable,
} as const;
