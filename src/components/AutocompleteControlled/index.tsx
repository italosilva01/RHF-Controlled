import { Brand } from "@/types";
import { Autocomplete, TextField, AutocompleteProps } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface AutocompleteReactHookFormProps<TField extends FieldValues>
  extends AutocompleteProps<Brand, false, false, false, any> {
  control: Control<TField, any>;
  formFieldValue?: any;
  name: Path<TField>;
  placeholder: string;
  label: string;
  rules?: object;
  error: FieldError | undefined | any;
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
    if (formFieldValue === "") {
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
              getOptionLabel={(option) => (option ? option.label || "" : "")}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label && option.value === value.value
              }
              onChange={(_e, newValue: Brand | Brand[], _reason, _details) => {
                onChange(newValue as Brand);
                setInputValue(newValue ? (newValue as Brand).label : "");
              }}
              disableClearable
              options={options}
              style={{ width: 450 }}
              inputValue={inputValue}
              isOptionEqualToValue={(option, value) => option === value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  color="secondary"
                  placeholder={placeholder}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          );
        }}
      />
    </>
  );
};
