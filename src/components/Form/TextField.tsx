import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { FieldProps, getIn } from "formik";

export interface TextFieldProps
  extends FieldProps,
    Omit<MuiTextFieldProps, "name" | "value" | "error"> {}

export function fieldToTextField({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors },
  onBlur,
  helperText,
  ...props
}: TextFieldProps): MuiTextFieldProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    error: showError,
    helperText: showError ? fieldError : helperText,
    disabled: disabled ?? isSubmitting,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    value: field.value ?? "",
    ...props,
  };
}

const TextField = ({ children, ...props }: TextFieldProps) => {
  return <MuiTextField {...fieldToTextField(props)}>{children}</MuiTextField>;
};

export default TextField;
