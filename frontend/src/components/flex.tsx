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
  gap: 0.4rem;
`;

export const ShrinkingRow = styled.div`
  display: flex;
  @media (max-width: 40rem) {
    flex-direction: column;
  }
`;

export const CardContainer = styled(Column)``;

export const DetailSection = styled(Row)`
  justify-content: start;
  align-items: center;
  padding: 0.4rem 0;
`;

export const ListSection = styled(Column)`
  justify-content: start;
  align-items: start;
  padding: 0.4rem 0;
`;
