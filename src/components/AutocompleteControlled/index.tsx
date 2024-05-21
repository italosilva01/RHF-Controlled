import { Autocomplete, TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface AutocompleteReactHookFormProps<TField extends FieldValues> {
  control: Control<TField, any>;
  formFieldValue?: string;
  options: string[];
  name: Path<TField>;
  placeholder: string;
  label: string;
  rules?: object;
  error: FieldError | undefined;
}
export const AutoCompleteControlled = <TField extends FieldValues>({
  control,
  formFieldValue,
  options,
  name,
  placeholder,
  label,
  rules = { required: true },
  error,
}: AutocompleteReactHookFormProps<TField>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const { onChange } = field;
          return (
            <Autocomplete
              {...field}
              onChange={(_e, newValue) => {
                onChange(newValue);
              }}
              options={options}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  value={formFieldValue}
                  error={!!error}
                />
              )}
            />
          );
        }}
      />
    </>
  );
};
