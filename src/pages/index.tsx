import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Head from "next/head";

import { Content } from "@components/Content";
import { Form } from "@components/Form";
import AxiosInstance from "@/services/axiosInstancia";
import { Brand } from "@/types";
import { useCars } from "@/hooks/useCars";
import { useEffect } from "react";

export default function Home({
  cars,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { setupBrands } = useCars();

  useEffect(() => {
    setupBrands(cars);
  });

  return (
    <>
      {/* <Content> */}
      <TypographyCustomized variant="h4">Tabela Fipe</TypographyCustomized>
      <TypographyCustomized variant="h5">
        Consulte o valor de um veículo de forma gratuita
      </TypographyCustomized>
      <Form />
      {/* </Content> */}
    </>
  );
}

export const getStaticProps = (async (context) => {
  const res = await AxiosInstance.get("/carros/marcas");
  const cars = Object.values(res.data) as Brand[];

  return { props: { cars } };
}) satisfies GetStaticProps<{
  cars: Brand[];
}>;
const TypographyCustomized = styled(Typography)`
  font-weight: 900;
  color: #2c2b2c;
`;
