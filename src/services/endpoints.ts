export const getModels = (brandId: number) => {
  return `/carros/marcas/${brandId}/modelos`;
};
export const getBrandsCars = "/carros/marcas";
export const consultVehicle = (
  brandId: number,
  modelId: number,
  year: number
) => {
  return `/carros/marcas/${brandId}/modelos/${modelId}/anos/${year}`;
};
