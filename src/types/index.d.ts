export type Brand = {
  label: string;
  value: string;
};

export type Model = Brand;
export type Year = Brand;

export type InputsForm = {
  brand: Brand;
  model: Model;
  year: Year;
};

export type Car = {
  yearCar: number;
  brandCar: string;
  modelCar: string;
  priceCar: string;
};
