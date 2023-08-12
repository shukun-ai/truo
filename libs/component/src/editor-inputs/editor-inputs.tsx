import { Text } from '@mantine/core';

import { AtomNameInput } from './atom-name/atom-name.input';
import { EditorInputProps } from './editor-inputs.type';

export type EditorInputsProps = {
  editorType: 'atomName' | string;
} & EditorInputProps;

export const EditorInputs = (props: EditorInputsProps) => {
  switch (props.editorType) {
    case 'atomName':
      return <AtomNameInput {...props} />;
    default:
      return <Text>没有内置 {props.editorType} 输入框</Text>;
  }
};
