export const hasProperty = (
  value: Record<string, unknown>,
  properties: Record<string, string | number | boolean | null | undefined>,
) => {
  for (const [property, propertyValue] of Object.entries(properties)) {
    if (value[property] !== propertyValue) {
      throw new Error('The value is not given');
    }
  }
  return true;
};
