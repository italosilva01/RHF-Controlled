import { useCars } from "@/hooks/useCars";
import { Brand, InputsForm } from "@/types";
import emotionStyled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Collapse,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  } = useForm<InputsForm>();
  const onSubmit: SubmitHandler<InputsForm> = (data) => console.log(data);

  console.log(watch("brand")); // watch input value by passing the name of it

  return (
    <CardCustomized sx={{ maxWidth: 540, width: 540 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          disablePortal
          options={brands}
          {...register("brand")}
          renderInput={(params) => <TextField {...params} label="Marca" />}
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
