import { FacilityControllerService } from "@/generated";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const facilities = await FacilityControllerService.getFacilities();
    return { facilities };
  },
  onError: notFound,
});

function RouteComponent() {
  const { facilities } = Route.useLoaderData();

  return (
    <>
      <Link to="/test">
        <h1>Test</h1>
      </Link>
    </>
  );
}
