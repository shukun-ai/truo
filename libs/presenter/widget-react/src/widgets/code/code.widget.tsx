import {
  codeDefinition,
  CodeDefinitionProps,
} from '@shukun/presenter/definition';

import { createWidget } from '../../abstracts/create-widget';

export const CodeWidget = createWidget<CodeDefinitionProps>(
  codeDefinition,
  (props) => {
    return <code>{JSON.stringify(props.value)}</code>;
  },
);
