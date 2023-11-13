export type TreeMenuKey = string;
export type TreeMenuListBase = { key: TreeMenuKey; label: string };
export type TreeMenuList<T extends TreeMenuListBase> = Record<TreeMenuKey, T>;
export type TreeMenuStructure = {
  [parentTreeMenuKey: TreeMenuKey]: TreeMenuKey[];
};
export type TreeMenuSelections = Record<TreeMenuKey, true>;
export type TreeMenuCollapses = Record<TreeMenuKey, true>;
