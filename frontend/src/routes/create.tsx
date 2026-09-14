import { createFileRoute, notFound } from "@tanstack/react-router";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";
import {
  FishControllerService,
  OrganizationControllerService,
} from "@/generated";
import { FacilityForm } from "@/components/facilityForm";
import { Heading, Title } from "@/components/text";

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

  return (
    <>
      <Title>Opprett nytt anlegg</Title>
      <FacilityForm
        availableFish={fishList}
        availableOrganizations={organizationList}
      />
    </>
  );
}
