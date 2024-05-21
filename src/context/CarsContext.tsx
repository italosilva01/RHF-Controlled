import { Brand } from "@/types";
import { createContext, useState } from "react";

type CarsContextType = {
  BrandCars: Brand[];
  setupBrands: (brands: Brand[]) => void;
};

interface CarsProviderProps {
  children: React.ReactNode;
}
export const CarsContext = createContext<CarsContextType>({
  BrandCars: [],
  setupBrands: () => {},
});

export const CarsProvider = ({ children }: CarsProviderProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const setupBrands = (brand: Brand[]) => {
    setBrands(brand);
  };

  return (
    <CarsContext.Provider value={{ BrandCars: brands, setupBrands }}>
      {children}
    </CarsContext.Provider>
  );
};
