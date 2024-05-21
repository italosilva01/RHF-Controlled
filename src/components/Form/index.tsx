import { useCars } from "@/hooks/useCars";
import { InputsForm, Model, Year } from "@/types";
import emotionStyled from "@emotion/styled";
import { Box, Button, Card, Collapse } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutoCompleteControlled } from "@components/AutocompleteControlled";
import AxiosInstance from "@/services/axiosInstancia";

export const Form = () => {
  const [currentOptionsModels, setCurrentOptionsModels] = useState<Model[]>([]);
  const [currentOptionsYears, setCurrentOptionsYears] = useState<Year[]>([]);
  const { brandCars } = useCars();

  const brands = useMemo(
    () => brandCars.map((item) => ({ nome: item.nome, value: item.codigo })),
    [brandCars]
  );

  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<InputsForm>();

  const currentBrand = watch("brand");
  const modelWasSelected = watch("model") !== undefined;

  const onSubmit: SubmitHandler<InputsForm> = (data) => {
    console.log(data);
  };

  const getModelsCurrentBrand = async (brand: string) => {
    const currentBrandId = brands.find((item) => item.nome === brand)?.value;

    const response = await AxiosInstance.get<any>(
      `/carros/marcas/${currentBrandId}/modelos`
    );

    const { modelos, anos } = response.data;
    setCurrentOptionsModels(modelos);
    setCurrentOptionsYears(anos);
  };

  useEffect(() => {
    if (undefined === currentBrand) return;
    getModelsCurrentBrand(currentBrand);
  }, [currentBrand]);

  return (
    <CardCustomized sx={{ maxWidth: 540, width: 540 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoCompleteControlled
          name={"brand"}
          control={control}
          options={brands.map((brand) => brand.nome)}
          label="Marca"
          placeholder={"Escolha uma marca..."}
          error={errors.brand}
        />
        <AutoCompleteControlled
          name={"model"}
          control={control}
          options={currentOptionsModels.map((model) => model.nome)}
          label="Modelo"
          placeholder={"Escolha um modelo..."}
          error={errors.model}
        />
        <Collapse in={modelWasSelected}>
          <AutoCompleteControlled
            name={"year"}
            control={control}
            options={currentOptionsYears.map((item) => item.nome)}
            label="Ano"
            placeholder={"Escolha um Ano..."}
            error={errors.year}
          />
        </Collapse>
        <ContainerActions check={modelWasSelected}>
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
