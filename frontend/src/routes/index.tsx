import { FacilityControllerService } from "@/generated";
import { format } from "date-fns";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BigText, Heading, Title } from "@/components/text";
import { CardContainer } from "@/components/flex";
import { Grid } from "@/components/grid";
import { FacilityCard } from "@/components/card";

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
      <Title>Annlegg for oppdrettsfiske</Title>
      <Grid>
        {facilities.map((f) => (
          <Link
            key={f.details!.id!}
            to={"/info/$facilityId"}
            params={{
              facilityId: f.details!.id!,
            }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FacilityCard
              name={f.details!.name!}
              created={f.details!.created!}
              location={f.details!.locationType!}
            />
          </Link>
        ))}
      </Grid>
    </>
  );
}
