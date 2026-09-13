import styled from "styled-components";

/**
 * Justifies children items in a column. Semantically a <div> tag.
 */
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
`;

/**
 * Justifies children in a row. semantically a <div> tag.
 */
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
`;
