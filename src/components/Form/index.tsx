import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Collapse } from "@mui/material";

import { AutoCompleteControlled } from "@components/AutocompleteControlled";
import AxiosInstance from "@/services/axiosInstancia";
import { useCars } from "@/hooks/useCars";
import { consultVehicle, getModels } from "@/services/endpoints";
import { consultCarOne, modelOne } from "@/mock";
import { CardCustomized, ContainerActions, ButtonStyled } from "./style";
import { defaultValues } from "@/constants";
import { findItem } from "@utils/index";
import { InputsForm, Model, Year } from "@/types";

export const Form = () => {
  const [currentOptionsModels, setCurrentOptionsModels] = useState<Model[]>([]);
  const [currentOptionsYears, setCurrentOptionsYears] = useState<Year[]>([]);
  const router = useRouter();
  const { brandCars, setCarConsulted } = useCars();
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
    defaultValues,
  });
  const brands = useMemo(
    () => brandCars.map((item) => ({ nome: item.nome, codigo: item.codigo })),
    [brandCars]
  );

  const currentBrand = watch("brand");
  const currentModel = watch("model");
  const currentYear = watch("year");

  const modelWasSelected = currentModel !== "";
  const values = getValues();
  const allFieldsFilled = Object.values(values).some(
    (value) => value === "" || value === null || value === undefined
  );

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    const currentBrandId = findItem(brands, data.brand);
    const currentModelId = findItem(currentOptionsModels, data.model);
    const currentYearId = findItem(currentOptionsYears, data.year);

    console.table({ currentBrandId, currentModelId, currentYearId });
    try {
      // const response = await AxiosInstance.get<any>(
      //   consultVehicle(currentBrandId, currentModelId, currentYearId)
      // );
      const response = { data: { ...consultCarOne } };
      const carConsulted = {
        yearCar: response.data.AnoModelo,
        brandCar: response.data.Marca,
        modelCar: response.data.Modelo,
        priceCar: response.data.Valor,
      };
      setCarConsulted(carConsulted);
      router.push("/result");
    } catch (error) {
      alert(
        "Erro ao buscar por esses dados. O erro é na API. Por favor, tente outro modelo!!"
      );
    }
  };

  const clearAndResetForm = () => {
    clearFields();
    reset();
  };

  const clearFields = () => {
    setCurrentOptionsModels([]);
    setCurrentOptionsYears([]);
    setValue("model", "");
    setValue("year", "");
  };

  const clearFieldYear = () => {
    setValue("year", "");
    resetField("year");
  };

  const getModelsCurrentBrand = async (brand: string) => {
    const brandId = brands.find((item) => item.nome === brand)?.codigo;
    if (brandId == undefined) return;
    // const response = await AxiosInstance.get<any>(getModels(brandId));
    const response = { data: { ...modelOne } };
    const { modelos, anos } = response.data;

    setCurrentOptionsModels(modelos);
    setCurrentOptionsYears(anos);
  };

  useEffect(() => {
    const brandIsEmpty = currentBrand === "";
    if (brandIsEmpty) {
      clearAndResetForm();
      return;
    }
    if (currentModel !== undefined || currentYear !== undefined) {
      clearFields();
    }
    getModelsCurrentBrand(currentBrand);
  }, [currentBrand]);

  useEffect(() => {
    const modelIsEmpty = currentModel === "" || undefined === currentModel;

    if (modelIsEmpty) return;

    if (currentYear !== "") {
      clearFieldYear();
      return;
    }
  }, [currentModel]);

  useEffect(() => {
    const currentYearIsEmpty = currentYear === "" || undefined === currentYear;
    if (currentYearIsEmpty) {
      clearFieldYear();
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
          <ButtonStyled
            variant="contained"
            color="secondary"
            sx={{ width: 200 }}
            type="submit"
            disabled={allFieldsFilled}
          >
            Consultar preço
          </ButtonStyled>
        </ContainerActions>
      </form>
    </CardCustomized>
  );
};
