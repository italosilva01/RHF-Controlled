import { Label } from "@/components/Label";
import { TypographyCustomized } from "@/components/TypographyCustomized";
import emotionStyled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export default function Result() {
  const modelCar = "Cruze";
  const yearCar = "2019";
  const brandCar = "Chevrolet";
  return (
    <ResultContainer>
      <TypographyCustomized variant="h4">
        Tabela Fipe: Preço {brandCar} {modelCar} {yearCar}
      </TypographyCustomized>
      <Label>
        <Typography variant="h4" style={{ fontWeight: "900" }}>
          R$ 100.000,00
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
