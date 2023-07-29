export type EditorInputProps = {
  value: unknown;
  onChange: (value: unknown) => void;
  required?: boolean;
  schema: unknown;
  disabled?: boolean;
};
