export const getModels = (brandId: string) => {
  return `/carros/marcas/${brandId}/modelos`;
};
export const getBrandsCars = "/carros/marcas";
export const consultVehicle = (
  brandId: string,
  modelId: string,
  year: string
) => {
  return `/carros/marcas/${brandId}/modelos/${modelId}/anos/${year}`;
};
