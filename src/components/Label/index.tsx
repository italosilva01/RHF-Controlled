import emotionStyled from "@emotion/styled";
import { Box } from "@mui/material";
interface LabelProps {
  children: React.ReactNode;
}

export const Label = ({ children }: LabelProps) => {
  return <LabelContainer>{children}</LabelContainer>;
};

const LabelContainer = emotionStyled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 25px; 
    
    width: max-content;
    
    color: #fff;
    background-color: #00a38c;

    border-radius: 50px;   

    `;
