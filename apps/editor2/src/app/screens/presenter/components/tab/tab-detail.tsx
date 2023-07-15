import { TypeException } from '@shukun/exception';

import { TabEntity } from '../../../../../repositories/tab/tab-ref';

import { TabConnector } from './tab-connector';
import { TabRepository } from './tab-repository';
import { TabWatch } from './tab-watch';

import { TabWidget } from './tab-widget';

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
    return <>metadata</>;
  }
  throw new TypeException('Did not find specific tab');
};
