import { FacilityControllerService } from "@/generated";
import { format } from "date-fns";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Heading } from "@/components/text";
import { CardContainer } from "@/components/flex";
import { Card } from "@/components/card";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const facilities = await FacilityControllerService.getFacilities();
    console.log(facilities);
    return { facilities };
  },
  onError: notFound,
});

function RouteComponent() {
  const { facilities } = Route.useLoaderData();

  return (
    <>
      <Heading>Anlegg</Heading>
      <CardContainer>
        {facilities.map((f) => (
          <FacilityCard
            routeId={f.details!.id!}
            name={f.details!.name!}
            created={f.details!.created!}
            location={f.details!.locationType!}
          />
        ))}
        <Link to="/test"></Link>
      </CardContainer>
    </>
  );
}

function FacilityCard({
  routeId,
  name,
  created,
  location,
}: {
  routeId: string;
  name: string;
  created: string;
  location: string;
}) {
  return (
    <Link
      key={routeId}
      to={"/info/$facilityId"}
      params={{
        facilityId: routeId,
      }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card>
        <p>{name}</p>
        <p>{created}</p>
        <p>{location}</p>
      </Card>
    </Link>
  );
}
