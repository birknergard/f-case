import { createFileRoute, notFound } from "@tanstack/react-router";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";
import {
  FishControllerService,
  OrganizationControllerService,
} from "@/generated";
import { FacilityForm } from "@/components/facilityForm";

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
    <FacilityForm
      availableFish={fishList}
      availableOrganizations={organizationList}
    />
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
