import { useParams } from 'react-router-dom';

export const useRouteOrgName = (): string => {
  const { orgName } = useParams();
  if (!orgName) {
    throw new Error('Did not find orgName from router.');
  }
  return orgName;
};
