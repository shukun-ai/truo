import { VariableSchema } from '../variable-schema';

export type StringInputProps = {
  value: VariableSchema;
  onChange: (newValue: VariableSchema) => void;
};

export const StringInput = () => {
  return <>StringInput</>;
};
