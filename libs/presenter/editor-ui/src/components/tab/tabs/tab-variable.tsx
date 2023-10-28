import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';
import { VariableDetail } from '../../variable-detail/variable-detail';

export type TabVariableProps = {
  tab: TabEntity;
};

export const TabVariable = ({ tab }: TabVariableProps) => {
  const { state } = useEditorContext();

  const variableEntity = useMemo(() => {
    if (tab.tabType !== 'variable') {
      return null;
    }
    return state.repositories[tab.foreignId];
  }, [state.repositories, tab.foreignId, tab.tabType]);

  if (!variableEntity) {
    return null;
  }

  return (
    <VariableDetail
      tab={tab}
      variableEntity={variableEntity}
      variableId={variableEntity.id}
    />
  );
};
