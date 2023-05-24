import { customAlphabet } from 'nanoid';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 6);

export const createRandomWidgetId = (existIds: string[]): string => {
  const newId = nanoid();
  if (existIds.includes(newId)) {
    return createRandomWidgetId(existIds);
  } else {
    return newId;
  }
};
