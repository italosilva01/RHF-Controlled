import { Model } from "@/types";
import { createContext, useState } from "react";

type CarsContextType = {
  modelCars: Model[];
  setupModels: (models: Model[]) => void;
};

interface CarsProviderProps {
  children: React.ReactNode;
}
export const CarsContext = createContext<CarsContextType>({
  modelCars: [],
  setupModels: () => {},
});

export const CarsProvider = ({ children }: CarsProviderProps) => {
  const [models, setModels] = useState<Model[]>([]);

  const setupModels = (models: Model[]) => {
    setModels(models);
  };

  return (
    <CarsContext.Provider value={{ modelCars: models, setupModels }}>
      {children}
    </CarsContext.Provider>
  );
};
