export const findItem = (items: any[], nameItem: string) => {
  return items.find((item) => item.nome === nameItem)!.codigo;
};
