import { FacilityForm } from "@/components/facilityForm";
import { Title } from "@/components/text";
import {
  FacilityControllerService,
  FishControllerService,
  OrganizationControllerService,
} from "@/generated";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/edit/$facilityId")({
  component: RouteComponent,
  shouldReload: true,
  loader: async ({ params }) => {
    const [initialData, fishList, organizationList] = await Promise.all([
      FacilityControllerService.getFacility(params.facilityId),
      FishControllerService.getFishes(),
      OrganizationControllerService.getOrgs(),
    ]);
    return { initialData, fishList, organizationList };
  },
  onError: notFound,
});

function RouteComponent() {
  const { initialData, fishList, organizationList } = Route.useLoaderData();
  return (
    <>
      <Title>Rediger anlegg</Title>
      <FacilityForm
        initialData={initialData}
        availableFish={fishList}
        availableOrganizations={organizationList}
      />
    </>
  );
}
