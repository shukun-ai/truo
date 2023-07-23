import { useParams } from 'react-router-dom';

import { environment } from '../../environments/environment';

export const usePreviewUrl = () => {
  const { orgName, presenterName } = useParams();
  const domain = environment.previewDomain;
  return `${domain}/presenter/${orgName}/${presenterName}`;
};
