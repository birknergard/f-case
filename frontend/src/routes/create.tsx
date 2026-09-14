import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  FishControllerService,
  OrganizationControllerService,
} from "@/generated";
import { FacilityForm } from "@/components/facilityForm";
import { Title } from "@/components/text";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
  loader: async () => {
    const [fishList, organizationList] = await Promise.all([
      FishControllerService.getFishes(),
      OrganizationControllerService.getOrgs(),
    ]);
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
