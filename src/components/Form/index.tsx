import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Collapse } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";

import AxiosInstance from "@/services/axiosInstancia";
import { useCars } from "@/hooks/useCars";
import { consultVehicle, getModels } from "@/services/endpoints";
import { consultCarOne, modelOne } from "@/mock";
import { CardCustomized, ContainerActions, ButtonStyled } from "./style";
import { defaultValues, schema } from "@/constants";
import { findItem } from "@utils/index";
import { Brand, InputsForm, Model, Year } from "@/types";
import { RHFAutocompleteField } from "../RHFAutocompleteField";

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
    resolver: yupResolver(schema),
  });

  const emptyBrand = {} as Brand;
  const emptyModel = {} as Model;
  const emptyYear = {} as Year;

  const emptyBrandValue = "";
  const emptyModelValue = "";
  const emptyYearValue = "";

  const currentBrand = watch("brand");
  const currentModel = watch("model");
  const currentYear = watch("year");

  const modelWasSelected = useMemo(
    () => (currentModel ? true : false),
    [currentModel]
  );

  const values = getValues();
  const allFieldsFilled = Object.values(values).some(
    (value) =>
      value === emptyBrandValue || value === null || value === undefined
  );

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    console.log(data);

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
    setValue("model", emptyModelValue);
    setValue("year", emptyYearValue);
  };

  const clearFieldYear = () => {
    setValue("year", emptyYearValue);
    //resetField("year");
  };

  const getModelsCurrentBrand = async (brandId: string) => {
    if (brandId == undefined) return;
    // const response = await AxiosInstance.get<any>(getModels(brandId));
    const response = { data: { ...modelOne } };
    const { modelos, anos } = response.data;

    setCurrentOptionsModels(
      () =>
        modelos.map((item) => ({
          label: item.nome,
          id: item.codigo,
        })) as unknown as Model[]
    );
    setCurrentOptionsYears(
      () =>
        anos.map((item) => ({
          label: item.nome,
          id: item.codigo,
        })) as unknown as Year[]
    );
  };

  useEffect(() => {
    if (currentBrand === undefined) return;

    const brandIsEmpty = currentBrand === emptyBrandValue;
    const modelIsUndefined = currentModel === undefined;
    const yearIsUndefined = currentYear === undefined;

    if (brandIsEmpty) {
      clearAndResetForm();
      return;
    }
    if (!modelIsUndefined || !yearIsUndefined) {
      clearFields();
    }
    getModelsCurrentBrand(currentBrand);
  }, [currentBrand]);

  useEffect(() => {
    const modelIsEmpty = currentModel === emptyModelValue;
    const yearIsNotEmpty = currentYear !== "";

    if (modelIsEmpty) return;

    if (yearIsNotEmpty) {
      clearFieldYear();
      return;
    }
  }, [currentModel]);

  useEffect(() => {
    const yearIsEmpty = currentYear === emptyYearValue;

    if (yearIsEmpty) {
      clearFieldYear();
      return;
    }
  }, [currentYear]);

  return (
    <CardCustomized sx={{ maxWidth: 540, width: 540 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFAutocompleteField
          options={brandCars}
          control={control}
          name={"brand"}
          placeholder={"Marca"}
          formFieldValue={getValues("brand")}
        />
        <RHFAutocompleteField
          options={currentOptionsModels}
          control={control}
          name={"model"}
          placeholder={"Modelo"}
          formFieldValue={getValues("model")}
        />{" "}
        <Collapse in={modelWasSelected}>
          <RHFAutocompleteField
            options={currentOptionsYears}
            control={control}
            name={"year"}
            placeholder={"Ano"}
            formFieldValue={getValues("year")}
          />
        </Collapse>
        <ContainerActions check={modelWasSelected}>
          <ButtonStyled
            variant="contained"
            color="secondary"
            sx={{ width: 200 }}
            type="submit"
            // disabled={allFieldsFilled}
          >
            Consultar preço
          </ButtonStyled>
        </ContainerActions>
      </form>
    </CardCustomized>
  );
};
