import { Brand, Car } from "@/types";
import { createContext, useState } from "react";
import { set } from "react-hook-form";

type CarsContextType = {
  brandCars: Brand[];
  infoCarConsulted: Car;
  setupBrands: (brands: Brand[]) => void;
  setCarConsulted: (car: Car) => void;
};

interface CarsProviderProps {
  children: React.ReactNode;
}
export const CarsContext = createContext<CarsContextType>({
  brandCars: [],
  infoCarConsulted: {} as Car,
  setupBrands: () => {},
  setCarConsulted: () => {},
});

export const CarsProvider = ({ children }: CarsProviderProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [infoCarConsulted, setInfoCarConsulted] = useState<Car>({} as Car);
  const setupBrands = (brand: Brand[]) => {
    setBrands(brand);
  };

  const setCarConsulted = (car: Car) => {
    setInfoCarConsulted(car);
  };
  return (
    <CarsContext.Provider
      value={{
        brandCars: brands,
        setupBrands,
        setCarConsulted,
        infoCarConsulted,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
