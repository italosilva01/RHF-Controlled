import styled from "@emotion/styled";

interface ContentProps {
  children: React.ReactNode;
  isResultPage: boolean;
}
export const Content = ({ children, isResultPage }: ContentProps) => {
  return <Div>{children}</Div>;
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  gap: 10px;
  margin: 0;
`;
