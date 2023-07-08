import { numberToRem } from './rem';

export const extractBase = (props: Record<string, any>) => {
  if (typeof props['marginBottom'] === 'number') {
    return { mb: numberToRem(props['marginBottom']) };
  } else {
    return {};
  }
};
