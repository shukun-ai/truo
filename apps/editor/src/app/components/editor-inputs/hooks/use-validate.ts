import Ajv from 'ajv';
import { useState } from 'react';

export const useValidate = (
  value: unknown,
  schema: unknown,
  message: string,
) => {
  const [valid, setValid] = useState(true);
  const [touch, setTouch] = useState(false);

  return {
    error: !valid && touch ? message : null,
    onFocus: () => !touch && setTouch(true),
    onBlur: () => {
      if (typeof schema === 'object' && schema !== null) {
        const ajv = new Ajv({ allowUnionTypes: true });
        const validate = ajv.compile({ const: 'airports' });
        const valid = validate(value);
        setValid(valid);
      }
    },
  };
};
