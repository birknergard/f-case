import {
  createFileRoute,
  notFound,
  useLoaderData,
} from "@tanstack/react-router";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { Column, Row } from "@/components/flex";
import { format, endOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { Heading, Label } from "@/components/text";
import Input, { InputCheckbox, InputRadio } from "@/components/input";
import {
  FacilityControllerService,
  FishControllerService,
  OrganizationControllerService,
  type Fish,
} from "@/generated";
import { useMutation } from "@tanstack/react-query";
import type { Organization } from "@/models/facility";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
  loader: async () => {
    const fishList = await FishControllerService.getFishes();
    const organizationList = await OrganizationControllerService.getOrgs();
    return { fishList, organizationList };
  },
  onError: notFound,
});

function RouteComponent() {
  const { fishList, organizationList } = Route.useLoaderData();

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

  useEffect(() => {
    console.log(fish);
  }, [fish]);

  useEffect(() => {
    console.log(orgs);
  }, [orgs]);

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
          options={fishList}
          value={fish}
          onChange={(e) => setFish(e)}
        />
      </Section>
      <Section>
        <Label>Relaterte organisasjoner</Label>
        <InputCheckbox
          name="orgs-checkbox"
          options={organizationList}
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
