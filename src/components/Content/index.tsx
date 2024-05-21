import styled from "@emotion/styled";

interface ContentProps {
  children: React.ReactNode;
}
export const Content = ({ children }: ContentProps) => {
  return <Div>{children}</Div>;
};

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  margin: 0;
  background-color: #f9f6fc;
`;
