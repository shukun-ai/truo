export const getDisabledByTags = (
  allowedChildTags: string[],
  currentTag: string,
) => {
  if (allowedChildTags.length === 0) {
    return true;
  }
  if (allowedChildTags.includes('*')) {
    return false;
  }
  if (allowedChildTags.includes(currentTag)) {
    return false;
  }
  return true;
};
