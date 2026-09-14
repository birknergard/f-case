import styled from "styled-components";
import { Row } from "./flex";

export const ButtonContainer = styled(Row)`
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

export const Button = styled.button<{ $colored?: boolean }>`
  background-color: ${(props) => (!props.$colored ? "white" : "lightred")};
  padding: 1rem;
  border-radius: 5px;
  flex-grow: 1;
`;
