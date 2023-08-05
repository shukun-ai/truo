export const generateExports = (
  names: string[],
  outputPath: string,
): string => {
  return names
    .map((name) => {
      return `export * from './${outputPath}/${name}';`;
    })
    .join('\r');
};
