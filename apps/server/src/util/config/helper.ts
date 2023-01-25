export const getEnvOrFail = (env: unknown): string => {
  if (!env || typeof env !== 'string') {
    throw new Error(`Did not configure ${env}, or it is not a string.`);
  }
  return env;
};
