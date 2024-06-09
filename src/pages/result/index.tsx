import emotionStyled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Label } from "@/components/Label";
import { TypographyCustomized } from "@/components/TypographyCustomized";
import { useSelector } from "react-redux";
import { stateType } from "@/types";

export default function Result() {
  const infoCarConsulted = useSelector((state: stateType) => state.car);

  const { brandCar, modelCar, priceCar, yearCar } = infoCarConsulted;

  return (
    <ResultContainer>
      <TypographyCustomized variant="h4">
        Tabela Fipe: Preço {brandCar} {modelCar} {yearCar}
      </TypographyCustomized>
      <Label>
        <Typography variant="h4" style={{ fontWeight: "900" }}>
          {priceCar}
        </Typography>
      </Label>
      <TypographyMessage variant="body2">
        Este é o preço de compra do veículo
      </TypographyMessage>
    </ResultContainer>
  );
}

const ResultContainer = emotionStyled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0;
`;

const TypographyMessage = emotionStyled(Typography)`
  color:#666a6b;
`;
