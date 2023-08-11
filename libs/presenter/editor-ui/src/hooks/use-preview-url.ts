import { useParams } from 'react-router-dom';

import { useEditorState } from '../editor-context';

export const usePreviewUrl = (screenName: string) => {
  const { previewDomain } = useEditorState();

  const { orgName, presenterName } = useParams();
  return `${previewDomain}/presenter/${orgName}/${presenterName}/${screenName}`;
};
