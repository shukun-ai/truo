import { useObservableState } from 'observable-hooks';

import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { EditorTabWrapper } from '../../../../components/editor-tabs/editor-tab-wrapper';
import { useAppContext } from '../../../../contexts/app-context';

import { Screens } from './internal/screens';

export type ScreenDetailProps = {
  tab: TabEntity;
};

export const ScreenDetail = ({ tab }: ScreenDetailProps) => {
  const app = useAppContext();
  const allScreens = useObservableState(
    app.repositories.presenterRepository.screenRepository.all$,
    [],
  );

  return (
    <EditorTabWrapper>
      <Screens screens={allScreens} />
    </EditorTabWrapper>
  );
};
