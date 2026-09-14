import { FacilityControllerService } from "@/generated";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/info/$facilityId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const facility = await FacilityControllerService.getFacility(
      params.facilityId,
    );
    return { facility };
  },
});

function RouteComponent() {
  const { facility } = Route.useLoaderData();
  return <div>Hello "/info/$facilityId"!</div>;
}
