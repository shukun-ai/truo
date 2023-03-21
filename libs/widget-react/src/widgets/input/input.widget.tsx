import { FormControl, FormLabel, Input, FormHelperText } from '@mui/joy';
import { inputDefinition, InputDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const InputWidget = createWidget<InputDefinitionProps>(
  inputDefinition,
  (props) => {
    return (
      <FormControl>
        {!props.labelHidden && (
          <FormLabel>
            {props.label}
            {props.labelCaption}
          </FormLabel>
        )}

        <Input
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readOnly={props.readOnly}
          fullWidth
          onChange={(event) => props.change && props.change(event.target.value)}
        />
        <FormHelperText id="my-helper-text">{props.helper}</FormHelperText>
      </FormControl>
    );
  },
);
