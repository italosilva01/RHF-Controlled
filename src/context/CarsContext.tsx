import { Brand } from "@/types";
import { createContext, useState } from "react";

type CarsContextType = {
  brandCars: Brand[];
  setupBrands: (brands: Brand[]) => void;
};

interface CarsProviderProps {
  children: React.ReactNode;
}
export const CarsContext = createContext<CarsContextType>({
  brandCars: [],
  setupBrands: () => {},
});

export const CarsProvider = ({ children }: CarsProviderProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const setupBrands = (brand: Brand[]) => {
    setBrands(brand);
  };

  return (
    <CarsContext.Provider value={{ brandCars: brands, setupBrands }}>
      {children}
    </CarsContext.Provider>
  );
};
