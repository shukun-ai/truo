import { FormControl, OutlinedInput, FormHelperText } from '@mui/material';
import { inputDefinition, InputDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const InputWidget = createWidget<InputDefinitionProps>(
  inputDefinition,
  (props) => {
    return (
      <FormControl fullWidth>
        {!props.labelHidden && (
          <label>
            {props.label}
            {props.labelCaption}
          </label>
        )}

        <OutlinedInput
          type={props.type}
          value={props.value}
          multiline={props.multiline}
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

// <div>
//         <div>
//           <div>{props.label}</div>
//           <div>{props.labelCaption}</div>
//         </div>
//         <div>
//           <input
//             value={props.value}
//             onChange={(event) =>
//               props.change && props.change(event.target.value)
//             }
//           />
//         </div>
//       </div>
