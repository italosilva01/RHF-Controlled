import { Brand, Model, Year } from "@/types";

interface ConvertibleToModel {
  nome: string;
  codigo: string | number;
}

export const convertArray = <T extends ConvertibleToModel>(
  array: T[]
): Model[] | Brand[] | Year[] => {
  return array.map((item: T) => ({
    label: item.nome,
    id: String(item.codigo),
  }));
};
