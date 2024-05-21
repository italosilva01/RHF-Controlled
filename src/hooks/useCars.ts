import { CarsContext } from "@/context/CarsContext";
import { useContext } from "react";

export function useCars() {
  const context = useContext(CarsContext);

  return context;
}
