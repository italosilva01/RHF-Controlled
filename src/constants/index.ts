import { Brand, Model, Year } from "@/types";
import * as yup from "yup";

export const emptyBrandValue = "";
export const emptyModelValue = "";
export const emptyYearValue = "";
export const schema = yup.object().shape({
  brand: yup.string().required("Campo obrigatório"),
  model: yup.string().required("Campo obrigatório"),
  year: yup.string().required("Campo obrigatório"),
});
