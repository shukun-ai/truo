import { Text } from '@mantine/core';

import { AtomNameInput } from './atom-name/atom-name.input';

export type EditorInputsProps = {
  editorType: 'atomName' | string;
  value: unknown;
  onChange: (value: unknown) => void;
  required?: boolean;
  schema: unknown;
};

export const EditorInputs = (props: EditorInputsProps) => {
  switch (props.editorType) {
    case 'atomName':
      return <AtomNameInput {...props} />;
    default:
      return <Text>没有内置 {props.editorType} 输入框</Text>;
  }
};
