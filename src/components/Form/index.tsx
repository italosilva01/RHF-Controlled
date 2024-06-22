import { SubmitHandler, useForm } from "react-hook-form";

import { CardCustomized, ButtonStyled } from "./style";
import { emptyValue } from "@/constants";
import { Brand, InputsForm } from "@/types";
import { AutocompleteStyled } from "../RHFAutocompleteField";
import { TextField } from "@mui/material";
import { brands } from "@/mock";

export const Form = () => {
  const { handleSubmit, control, register } = useForm<InputsForm>({
    defaultValues: {
      autocompleteLessControlled: emptyValue,
    },
  });

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    console.log(data);
  };

  return (
    <CardCustomized sx={{ maxWidth: 540, width: 540 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutocompleteStyled
          options={brands}
          getOptionLabel={(option: unknown) => (option as Brand).label}
          {...register("autocompleteLessControlled")}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              label={"Less controlled"}
            />
          )}
        />

        {/* <RHFAutocompleteField
          options={brands}
          control={control}
          name={"autocompleteWithControlled"}
          placeholder={"With controlled"}
        /> */}

        <ButtonStyled
          data-testid="button-submit"
          variant="contained"
          color="secondary"
          sx={{ width: 200 }}
          type="submit"
        >
          Consultar preço
        </ButtonStyled>
      </form>
    </CardCustomized>
  );
};
