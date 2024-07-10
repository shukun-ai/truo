export const buildUrl = (value: string): URL => {
  // TODO only allow same origin, same org name and contents from web-engines.
  // TODO bypass the rule if enable develop mode
  try {
    return new URL(value);
  } catch (error) {
    const current = new URL(window.location.href);
    const next = new URL(`${current.protocol}//${current.host}${value}`);
    return next;
  }
};

export const addTimeStampForRefresh = (value: URL): URL => {
  value.searchParams.append('iframe-refresh', new Date().getTime().toString());
  return value;
};

export const urlToString = (value: URL): string => {
  return value.toString();
};
