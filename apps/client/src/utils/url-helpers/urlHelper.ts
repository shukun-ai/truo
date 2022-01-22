import psl from 'psl';

export const isSameDomain = (url1: string, url2: string) => {
  const parsed1 = psl.parse(
    url1.replace(/(http:\/\/)|(https:\/\/)|(\/\/)/, ''),
  );
  const parsed2 = psl.parse(
    url2.replace(/(http:\/\/)|(https:\/\/)|(\/\/)/, ''),
  );
  if (parsed1.error || parsed2.error) {
    return false;
  }
  return parsed1.domain === parsed2.domain;
};
