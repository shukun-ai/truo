import { useParams } from 'react-router-dom';

import { useEditorContext } from '../editor-context';

export const usePreviewUrl = (screenName: string) => {
  const { state } = useEditorContext();

  const { orgName, presenterName } = useParams();
  return `${state.previewDomain}/presenter/${orgName}/${presenterName}/${screenName}`;
};
