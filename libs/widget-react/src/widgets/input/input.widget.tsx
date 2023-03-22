import { Input } from '@mui/joy';
import { inputDefinition, InputDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { FormControl } from '../../shares/form-control';

export const InputWidget = createWidget<InputDefinitionProps>(
  inputDefinition,
  (props) => {
    return (
      <FormControl
        label={props.label}
        labelHidden={props.labelHidden}
        labelPosition={props.labelPosition}
        labelWidth={props.labelWidth}
        helper={props.helper}
      >
        <Input
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={(event) => props.change && props.change(event.target.value)}
        />
      </FormControl>
    );
  },
);
