export const runJson = (code: string): unknown => {
  const json = JSON.parse(code);
  return json;
};
