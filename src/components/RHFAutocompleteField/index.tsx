import { useEffect, useState } from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface RHFAutocompleteFieldProps<
  O extends { id: string; label: string },
  TField extends FieldValues
> {
  control: Control<TField>;
  name: Path<TField>;
  options: O[];
  placeholder?: string;
  formFieldValue?: any;
}

export const RHFAutocompleteField = <
  O extends { id: string; label: string },
  TField extends FieldValues
>(
  props: RHFAutocompleteFieldProps<O, TField>
) => {
  const [inputValue, setInputValue] = useState<string>("");

  const { control, options, name, formFieldValue } = props;
  useEffect(() => {
    if (formFieldValue === "") {
      setInputValue("");
    }
  }, [formFieldValue]);
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "this field is requried",
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <Autocomplete
              value={
                value
                  ? options.find((option) => {
                      return value === option.id;
                    }) ?? undefined
                  : undefined
              }
              getOptionLabel={(option) => {
                return option.label;
              }}
              onChange={(event: any, newValue) => {
                onChange(newValue ? newValue.id : null);
                setInputValue(newValue ? newValue.label : "");
              }}
              id="controllable-states-demo"
              options={options}
              disableClearable
              style={{ width: 450 }}
              inputValue={inputValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={props.placeholder}
                  inputRef={ref}
                  error={!!error}
                />
              )}
            />
            {error ? (
              <span style={{ color: "red" }}>{error.message}</span>
            ) : null}
          </>
        );
      }}
    />
  );
};
