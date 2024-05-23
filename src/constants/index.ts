import { Brand, Model, Year } from "@/types";
import * as yup from "yup";

export const defaultValues = {
  brand: {} as Brand,
  model: {} as Model,
  year: {} as Year,
};

export const schema = yup.object().shape({
  brand: yup.object().shape({
    label: yup.string().required("Campo obrigatório"),
    value: yup.string().required("Campo obrigatório"),
  }),
  model: yup.object().shape({
    label: yup.string().required("Campo obrigatório"),
    value: yup.string().required("Campo obrigatório"),
  }),
  year: yup.object().shape({
    label: yup.string().required("Campo obrigatório"),
    value: yup.string().required("Campo obrigatório"),
  }),
});
