export type ExtractFormItemProps<FieldValue> = {
  value: FieldValue | undefined;
  onChange: (value: FieldValue | null) => void;
  id: string;
};

export interface ExtractFormItemChildrenProps<FieldValue> {
  children: (props: ExtractFormItemProps<FieldValue>) => JSX.Element;
}

export function ExtractFormItem<FieldValue>({
  children,
  ...props
}: ExtractFormItemChildrenProps<FieldValue>) {
  const { value, onChange, id } = props as ExtractFormItemProps<FieldValue>;
  return children({ value, onChange, id });
}
