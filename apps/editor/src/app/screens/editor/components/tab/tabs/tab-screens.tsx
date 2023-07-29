import { TabEntity } from '../../../../../../repositories/tab/tab-ref';
import { ScreenDetail } from '../../screen-detail/screen-detail';

export type TabScreensProps = {
  tab: TabEntity;
};

export const TabScreens = ({ tab }: TabScreensProps) => {
  return <ScreenDetail tab={tab} />;
};
