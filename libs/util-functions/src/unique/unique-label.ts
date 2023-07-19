export const getUniqueLabel = (slug: string, existNames: string[]) => {
  let index = 0;
  let name: string = slug;
  while (existNames.includes(name)) {
    index++;
    name = `${slug}${index}`;
  }
  return name;
};
