import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Collapse } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import AxiosInstance from "@/services/axiosInstancia";
import { useCars } from "@/hooks/useCars";
import { consultVehicle, getModels, resultPage } from "@/services/endpoints";
import { CardCustomized, ContainerActions, ButtonStyled } from "./style";
import { emptyValue, schema } from "@/constants";
import { InputsForm, Model, Year, stateType } from "@/types";
import { RHFAutocompleteField } from "../RHFAutocompleteField";
import { consultCarOne, modelOne } from "@/mock";
import { convertArray } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { setCarConsulted } from "@/store/reducers/car";

export const Form = () => {
  const [currentOptionsModels, setCurrentOptionsModels] = useState<Model[]>([]);
  const [currentOptionsYears, setCurrentOptionsYears] = useState<Year[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    watch,
    formState: { isDirty },
    control,
    reset,
    setValue,
  } = useForm<InputsForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      brand: emptyValue,
      model: emptyValue,
      year: emptyValue,
    },
  });

  const brands = useSelector((state: stateType) => state.brands);

  const currentBrand = watch("brand");
  const currentModel = watch("model");
  const currentYear = watch("year");

  const modelWasSelected = useMemo(
    () => (currentModel ? true : false),
    [currentModel]
  );

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    const { brand, model, year } = data;
    console.log(data);
    try {
      // const response = await AxiosInstance.get<any>(
      //   consultVehicle(brand, model, year)
      // );
      const response = { data: { ...consultCarOne } };
      const carConsulted = {
        yearCar: response.data.AnoModelo,
        brandCar: response.data.Marca,
        modelCar: response.data.Modelo,
        priceCar: response.data.Valor,
      };
      dispatch(setCarConsulted(carConsulted));
      router.push(resultPage);
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
    setValue("model", emptyValue);
    setValue("year", emptyValue);
  };

  const clearFieldYear = () => {
    setValue("year", emptyValue);
  };

  const getModelsCurrentBrand = async (brandId: string) => {
    if (brandId == undefined) return;
    // const response = await AxiosInstance.get<any>(getModels(brandId));
    const response = { data: { ...modelOne } };
    const { modelos, anos } = response.data;

    setCurrentOptionsModels(() => convertArray(modelos));
    setCurrentOptionsYears(() => convertArray(anos));
  };

  useEffect(() => {
    if (currentBrand === undefined) return;

    const brandIsEmpty = currentBrand === emptyValue;
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
    const modelIsEmpty = currentModel === emptyValue;
    const yearIsNotEmpty = currentYear !== emptyValue;

    if (modelIsEmpty) return;

    if (yearIsNotEmpty) {
      clearFieldYear();

      return;
    }
  }, [currentModel]);

  useEffect(() => {
    const yearIsEmpty = currentYear === emptyValue;

    if (yearIsEmpty) {
      clearFieldYear();
      return;
    }
  }, [currentYear]);

  return (
    <CardCustomized sx={{ maxWidth: 540, width: 540 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFAutocompleteField
          options={brands}
          control={control}
          name={"brand"}
          placeholder={"Marca"}
        />
        <RHFAutocompleteField
          options={currentOptionsModels}
          control={control}
          name={"model"}
          placeholder={"Modelo"}
        />{" "}
        <Collapse in={modelWasSelected}>
          <RHFAutocompleteField
            options={currentOptionsYears}
            control={control}
            name={"year"}
            placeholder={"Ano"}
          />
        </Collapse>
        <ContainerActions check={modelWasSelected}>
          <ButtonStyled
            data-testid="button-submit"
            variant="contained"
            color="secondary"
            sx={{ width: 200 }}
            type="submit"
            disabled={!isDirty}
          >
            Consultar preço
          </ButtonStyled>
        </ContainerActions>
      </form>
    </CardCustomized>
  );
};
