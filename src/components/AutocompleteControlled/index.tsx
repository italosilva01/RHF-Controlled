import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface AutocompleteReactHookFormProps<TField extends FieldValues> {
  control: Control<TField, any>;
  formFieldValue?: string;
  options: string[];
  name: Path<TField>;
  placeholder: string;
  label: string;
}
export const AutoCompleteControlled = <TField extends FieldValues>({
  control,
  formFieldValue,
  options,
  name,
  placeholder,
  label,
}: AutocompleteReactHookFormProps<TField>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
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
                />
              )}
            />
          );
        }}
      />
    </>
  );
};
