import * as yup from "yup";

export const defaultValues = {
  brand: "",
  model: "",
  year: "",
};

export const schema = yup.object().shape({
  brand: yup.string().required("Campo obrigatório"),
  model: yup.string().required("Campo obrigatório"),
  year: yup.string().required("Campo obrigatório"),
});
