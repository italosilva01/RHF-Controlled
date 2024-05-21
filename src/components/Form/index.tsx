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
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutoCompleteControlled } from "@components/AutocompleteControlled";

export const Form = () => {
  const [check, setTemp] = useState(false);
  const { BrandCars: modelCars } = useCars();

  const brands = useMemo(
    () => modelCars.map((item) => ({ label: item.nome, value: item.codigo })),
    [modelCars]
  );

  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<InputsForm>();
  const onSubmit: SubmitHandler<InputsForm> = (data) => {
    console.log(data);
  };
  console.log(watch("brand"));
  useEffect(() => {
    console.log(errors);
  }, []);
  return (
    <CardCustomized sx={{ maxWidth: 540, width: 540 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoCompleteControlled
          name={"brand"}
          control={control}
          options={brands.map((brand) => brand.label)}
          label="Marca"
          placeholder={"Escolha uma marca..."}
          error={errors.brand}
        />
        <AutoCompleteControlled
          name={"model"}
          control={control}
          options={[]}
          label="Modelo"
          placeholder={"Escolha um modelo..."}
          error={errors.model}
        />
        <Collapse in={check}>
          <AutoCompleteControlled
            name={"year"}
            control={control}
            options={[]}
            label="Ano"
            placeholder={"Escolha um Ano..."}
            error={errors.year}
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
