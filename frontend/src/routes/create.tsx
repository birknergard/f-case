import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { Column, Row } from "@/components/flex";
import { format, endOfDay } from "date-fns";
import { useState } from "react";
import { Heading, Label } from "@/components/text";
import Input, { InputRadio } from "@/components/input";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState<string>("Land");
  const [date, setDate] = useState(endOfDay(new Date()));

  return (
    <Container>
      <Heading>Opprett nytt anlegg</Heading>
      <Section>
        <Label>Navn</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Section>
      <Section>
        <Label>Stedtype</Label>
        <InputRadio
          name="location-radio"
          options={["Sjø", "Land"]} // Expand into general
          value={location!}
          onChange={(e) => setLocation(e)}
        />
      </Section>
      <Section>
        <Label>Stiftet</Label>
        <DatePicker
          value={format(date, "yyyy-MM-dd")}
          placeholderText=""
          selected={date}
          onSelect={(date) => setDate(date!)}
          endDate={new Date()}
        />
      </Section>
      <Section></Section>
    </Container>
  );
}

export const Container = styled(Column)`
display: flex;
flex-direction: 
  justify-content: center;
  align-items: center;
`;

export const Section = styled(Row)`
  justify-content: center;
  align-items: center;
`;
