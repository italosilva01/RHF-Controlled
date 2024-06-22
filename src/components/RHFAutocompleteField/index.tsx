import { Controller, Control, Path, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import emotionStyled from "@emotion/styled";

interface RHFAutocompleteFieldProps<
  O extends { id: string; label: string },
  TField extends FieldValues
> {
  control: Control<TField>;
  name: string;
  options: O[] & { label: string };
  placeholder?: string;
}

export const RHFAutocompleteField = <
  O extends { id: string; label: string },
  TField extends FieldValues
>(
  props: RHFAutocompleteFieldProps<O, TField>
) => {
  const { control, options, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <AutocompleteStyled
              value={
                (value
                  ? options.find((option) => {
                      return value === option.label;
                    }) ?? null
                  : null) as NonNullable<O> | undefined
              }
              getOptionLabel={(option) => {
                return option.label;
              }}
              onChange={(event: any, newValue) => {
                onChange(newValue ? newValue.label : null);
              }}
              options={options}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={props.placeholder}
                  inputRef={ref}
                  error={!!error}
                  color="secondary"
                  helperText={error?.message}
                />
              )}
            />
          </>
        );
      }}
    />
  );
};

export const AutocompleteStyled = emotionStyled(Autocomplete)`
  width: 350px;
`;
