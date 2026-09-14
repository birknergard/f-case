import { FacilityForm } from "@/components/facilityForm";
import {
  FacilityControllerService,
  FishControllerService,
  OrganizationControllerService,
} from "@/generated";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/edit/$facilityId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const initialData = await FacilityControllerService.getFacility(
      params.facilityId,
    );
    const fishList = await FishControllerService.getFishes();
    const orgList = await OrganizationControllerService.getOrgs();
    return { initialData, fishList, orgList };
  },
  onError: notFound,
});

function RouteComponent() {
  const { initialData, fishList, orgList } = Route.useLoaderData();

  return (
    <FacilityForm
      initialData={initialData}
      availableFish={fishList}
      availableOrganizations={orgList}
    />
  );
}
