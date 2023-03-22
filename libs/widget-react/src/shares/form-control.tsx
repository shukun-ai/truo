import {
  FormControl as BaseFormControl,
  FormLabel,
  FormHelperText,
} from '@mui/joy';

export type FormControlProps = {
  label: string | undefined;
  labelHidden: boolean | undefined;
  labelPosition: 'left' | 'top' | undefined;
  labelWidth: string | undefined;
  helper: string | undefined;
  children: JSX.Element;
};

export const FormControl = (props: FormControlProps) => {
  return (
    <BaseFormControl>
      {!props.labelHidden && <FormLabel>{props.label}</FormLabel>}
      {props.children}
      <FormHelperText>{props.helper}</FormHelperText>
    </BaseFormControl>
  );
};
