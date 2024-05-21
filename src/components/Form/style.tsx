import emotionStyled from "@emotion/styled";
import { Box, Card } from "@mui/material";

export const CardCustomized = emotionStyled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px ;
    width: 100%;
    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;
export const ContainerActions = emotionStyled(Box)<BoxProps>`
margin-top:${(props) => (props.check ? "0px" : "-20px")} ;
display: flex;
justify-content: center;
`;
