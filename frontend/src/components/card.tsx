import styled from "styled-components";
import { Label, SmallText, Text } from "@/components/text";
import { format } from "date-fns";

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
      <Label>{name}</Label>
      <Text>{location}-anlegg</Text>
      <SmallText>Siden {format(created, "dd/MM/yyyy")}</SmallText>
    </Card>
  );
}

export const Card = styled.div`
  border: 2px solid black;
  background-color: white;
  padding: 0.5rem;
  border-radius: 2px;
`;
