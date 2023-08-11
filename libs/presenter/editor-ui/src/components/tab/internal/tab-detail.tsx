import { TypeException } from '@shukun/exception';

import { TabConnector } from '../tabs/tab-connector';
import { TabContainers } from '../tabs/tab-containers';
import { TabEnvironment } from '../tabs/tab-environment';
import { TabMetadata } from '../tabs/tab-metadata';
import { TabRepository } from '../tabs/tab-repository';
import { TabScreens } from '../tabs/tab-screens';
import { TabWatch } from '../tabs/tab-watch';

import { TabWidget } from '../tabs/tab-widget';

export type TabDetailProps = {
  tab: TabEntity;
};

export const TabDetail = ({ tab }: TabDetailProps) => {
  if (tab.tabType === 'widget') {
    return <TabWidget tab={tab} />;
  }
  if (tab.tabType === 'repository') {
    return <TabRepository tab={tab} />;
  }
  if (tab.tabType === 'watch') {
    return <TabWatch tab={tab} />;
  }
  if (tab.tabType === 'connector') {
    return <TabConnector tab={tab} />;
  }
  if (tab.tabType === 'metadata') {
    return <TabMetadata tab={tab} />;
  }
  if (tab.tabType === 'environment') {
    return <TabEnvironment tab={tab} />;
  }
  if (tab.tabType === 'screens') {
    return <TabScreens tab={tab} />;
  }
  if (tab.tabType === 'containers') {
    return <TabContainers tab={tab} />;
  }
  throw new TypeException('Did not find specific tab');
};
