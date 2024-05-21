export type Brand = {
  nome: string;
  codigo: number;
};

export type Model = Brand;
export type Year = Brand;

export type InputsForm = {
  brand: string;
  model: string;
  year: string;
};
