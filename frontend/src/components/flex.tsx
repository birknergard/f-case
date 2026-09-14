import styled from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
`;

export const CardContainer = styled(Column)``;
