import { ApiError, FacilityControllerService } from "@/generated";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  loader: async () => {
    const test = await FacilityControllerService.get("test")
      .then((r) => r)
      .catch((error: ApiError) => {
        if (error.status === 404) {
          const newobj = "";
          //await FacilityControllerService.post(first).then((r) => r);
          // return await FacilityControllerService.get("test").then(r => r);
        }
      });

    console.log(test);

    return { test };
  },
  onError: notFound,
});

function RouteComponent() {
  return <div>Testpage!</div>;
}
