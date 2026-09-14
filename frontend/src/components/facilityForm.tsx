import {
  FacilityControllerService,
  type FacilityDto,
  type Fish,
  type Organization,
} from "@/generated";
import { useMutation } from "@tanstack/react-query";
import { endOfDay, format } from "date-fns";
import { useState } from "react";
import { Heading, Label } from "./text";
import Input, { InputCheckbox, InputRadio } from "./input";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { Column, Row } from "./flex";

export function FacilityForm({
  initialData,
  availableFish,
  availableOrganizations,
}: {
  initialData?: FacilityDto;
  availableFish: Fish[];
  availableOrganizations: Organization[];
}) {
  // Formdata
  const [name, setName] = useState("");
  const [location, setLocation] = useState<string>("Land");
  const [date, setDate] = useState(endOfDay(new Date()));
  const [fish, setFish] = useState<Fish[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);

  const { mutateAsync: post, isPending: isPosting } = useMutation({
    mutationFn: FacilityControllerService.postFacility,
    // TODO: Toast on error, success
  });

  const { mutateAsync: update, isPending: isUpdating } = useMutation({
    mutationFn: FacilityControllerService.putFacility,
    // TODO: Toast on error, success
  });

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
      <Section>
        <Label>Fiskearter</Label>
        <InputCheckbox
          name="fish-checkbox"
          options={availableFish}
          value={fish}
          onChange={(e) => setFish(e)}
        />
      </Section>
      <Section>
        <Label>Relaterte organisasjoner</Label>
        <InputCheckbox
          name="orgs-checkbox"
          options={availableOrganizations}
          value={orgs}
          onChange={(e) => setOrgs(e)}
        />
      </Section>
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
