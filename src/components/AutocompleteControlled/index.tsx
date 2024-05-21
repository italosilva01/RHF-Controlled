import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
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
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (formFieldValue === undefined) {
      setInputValue("");
    }
  }, [formFieldValue]);

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
                setInputValue(newValue);
              }}
              options={options}
              style={{ width: 450 }}
              inputValue={inputValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  color="secondary"
                  placeholder={placeholder}
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
