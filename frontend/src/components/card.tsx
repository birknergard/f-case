import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import { BigText, SmallText } from "./text";
import { format } from "date-fns";

export const Card = styled.div`
  border: 2px solid black;
  padding: 0.5rem;
  border-radius: 2px;
`;

export function FacilityCard({
  name,
  created,
  location,
}: {
  name: string;
  created: string;
  location: string;
}) {
  return (
    <Card>
      <BigText>
        {name}, {location}
      </BigText>
      <SmallText>Opprettet {format(created, "dd/MM/yyyy")}</SmallText>
    </Card>
  );
}
