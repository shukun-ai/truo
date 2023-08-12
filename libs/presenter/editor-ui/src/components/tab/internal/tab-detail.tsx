import { TypeException } from '@shukun/exception';

import { TabEntity } from '../../../editor-context';
import { TabConnector } from '../tabs/tab-connector';
import { TabEnvironment } from '../tabs/tab-environment';
import { TabMetadata } from '../tabs/tab-metadata';
import { TabRepository } from '../tabs/tab-repository';

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
  if (tab.tabType === 'connector') {
    return <TabConnector tab={tab} />;
  }
  if (tab.tabType === 'metadata') {
    return <TabMetadata tab={tab} />;
  }
  if (tab.tabType === 'environment') {
    return <TabEnvironment tab={tab} />;
  }
  throw new TypeException('Did not find specific tab');
};
