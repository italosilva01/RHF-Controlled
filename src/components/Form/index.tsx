import { useCars } from "@/hooks/useCars";
import { Brand, InputsForm } from "@/types";
import emotionStyled from "@emotion/styled";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Card,
  Collapse,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutoCompleteControlled } from "@components/AutocompleteControlled";

export const Form = () => {
  const [check, setTemp] = useState(false);
  const { BrandCars: modelCars } = useCars();

  const brands = useMemo(
    () => modelCars.map((item) => ({ label: item.nome })),
    [modelCars]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<InputsForm>();
  const onSubmit: SubmitHandler<InputsForm> = (data) =>
    console.log(watch("brand"));

  return (
    <CardCustomized sx={{ maxWidth: 540, width: 540 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoCompleteControlled
          name={"brand"}
          control={control}
          options={brands.map((item) => item.label)}
          label="Marca"
          placeholder={"Escolha uma marca..."}
        />
        <Autocomplete
          disablePortal
          options={[]}
          renderInput={(params) => <TextField {...params} label="Modelo" />}
        />
        <Collapse in={check}>
          <Autocomplete
            disablePortal
            style={{ width: 450 }}
            options={[]}
            renderInput={(params) => <TextField {...params} label="Ano" />}
          />
        </Collapse>
        <ContainerActions check={check}>
          <Button
            variant="contained"
            sx={{ width: 200 }}
            type="submit"
            disabled={false}
          >
            Consultar preço
          </Button>
        </ContainerActions>
      </form>

      <button
        onClick={() => {
          setTemp(!check);
        }}
      >
        teste
      </button>
    </CardCustomized>
  );
};

const CardCustomized = emotionStyled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px ;
    width: 100%;
    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

interface BoxProps {
  check?: boolean;
}

const ContainerActions = emotionStyled(Box)<BoxProps>`
        margin-top:${(props) => (props.check ? "0px" : "-20px")} ;
        display: flex;
        justify-content: center;
`;
