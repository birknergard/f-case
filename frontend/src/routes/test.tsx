import { FacilityControllerService } from "@/generated";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  loader: async () => {
    const start = await FacilityControllerService.getAll().then((r) => r)!;
    const first = await FacilityControllerService.get(
      start[0]?.details?.id!,
    ).then((r) => r);
    first.details!.id = "test";
    const recreated = await FacilityControllerService.post(first).then(
      (r) => r,
    );
    await FacilityControllerService.delete("test").then((r) => r);

    const end = await FacilityControllerService.getAll().then((r) => r)!;

    console.log("facilities start: ", start);
    console.log("recreated: ", recreated);
    console.log("facilities start: ", end);
    return { start };
  },
  onError: notFound,
});

function RouteComponent() {
  return <div>Testpage!</div>;
}
