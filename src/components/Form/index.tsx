import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { Box, Button, Card, Collapse } from "@mui/material";
import { AutoCompleteControlled } from "@components/AutocompleteControlled";
import AxiosInstance from "@/services/axiosInstancia";
import { useCars } from "@/hooks/useCars";
import { InputsForm, Model, Year } from "@/types";

import { CardCustomized, ContainerActions } from "./style";

export const Form = () => {
  const [currentOptionsModels, setCurrentOptionsModels] = useState<Model[]>([]);
  const [currentOptionsYears, setCurrentOptionsYears] = useState<Year[]>([]);
  const { brandCars } = useCars();
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
    setValue,
    getValues,
    resetField,
  } = useForm<InputsForm>({
    defaultValues: {
      brand: undefined,
      model: undefined,
      year: undefined,
    },
  });
  const brands = useMemo(
    () => brandCars.map((item) => ({ nome: item.nome, value: item.codigo })),
    [brandCars]
  );

  const currentBrand = watch("brand");
  const currentModel = watch("model");
  const currentYear = watch("year");

  const modelWasSelected = currentModel !== undefined;
  const values = getValues();
  const allFieldsFilled = Object.values(values).some(
    (value) => value === "" || value === null || value === undefined
  );

  const onSubmit: SubmitHandler<InputsForm> = (data) => {
    console.log(data);
  };

  const clearAndResetForm = () => {
    clearFields();
    reset();
  };

  const clearFields = () => {
    setCurrentOptionsModels([]);
    setCurrentOptionsYears([]);
    setValue("model", undefined);
    setValue("year", undefined);
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
    if (undefined === currentBrand || null === currentBrand) {
      clearAndResetForm();
      return;
    }
    if (currentModel !== undefined || currentYear !== undefined) {
      clearFields();
    }
    getModelsCurrentBrand(currentBrand);
  }, [currentBrand]);

  useEffect(() => {
    if (null === currentModel) {
      setValue("model", undefined);
      resetField("model");
      return;
    }
  }, [currentModel]);

  useEffect(() => {
    if (null === currentYear) {
      setValue("year", undefined);
      resetField("year");
      return;
    }
  }, [currentYear]);

  return (
    <CardCustomized sx={{ maxWidth: 540, width: 540 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoCompleteControlled
          name={"brand"}
          control={control}
          options={brands.map((brand) => brand.nome)}
          label="Marca"
          placeholder={"Escolha uma marca..."}
          formFieldValue={getValues("brand")}
          error={errors.brand}
        />
        <AutoCompleteControlled
          name={"model"}
          control={control}
          options={currentOptionsModels.map((model) => model.nome)}
          label="Modelo"
          placeholder={"Escolha um modelo..."}
          error={errors.model}
          formFieldValue={getValues("model")}
        />
        <Collapse in={modelWasSelected}>
          <AutoCompleteControlled
            name={"year"}
            control={control}
            options={currentOptionsYears.map((item) => item.nome)}
            label="Ano"
            placeholder={"Escolha um Ano..."}
            error={errors.year}
            formFieldValue={getValues("year")}
          />
        </Collapse>
        <ContainerActions check={modelWasSelected}>
          <Button
            variant="contained"
            sx={{ width: 200 }}
            type="submit"
            disabled={allFieldsFilled}
          >
            Consultar preço
          </Button>
        </ContainerActions>
      </form>
    </CardCustomized>
  );
};

interface BoxProps {
  check?: boolean;
}
