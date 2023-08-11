import { ContainerPane } from '../../container/container-pane';

export type TabContainersProps = {
  tab: TabEntity;
};

export const TabContainers = ({ tab }: TabContainersProps) => {
  return <ContainerPane />;
};
