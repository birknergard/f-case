import { FacilityControllerService } from "@/generated";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  loader: async () => {
    const facilities = await FacilityControllerService.getAll().then((r) => r)!;
    const first = await FacilityControllerService.get(
      facilities[0]?.details?.id!,
    );
    console.log("facilities: ", facilities);
    console.log("detailed: ", first);
    return { facilities, first };
  },
  onError: notFound,
});

function RouteComponent() {
  return <div>Testpage!</div>;
}
