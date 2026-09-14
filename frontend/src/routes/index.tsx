import { FacilityControllerService } from "@/generated";
import {
  Link,
  createFileRoute,
  notFound,
  useRouter,
} from "@tanstack/react-router";
import { Title } from "@/components/text";
import { Grid } from "@/components/grid";
import { FacilityCard } from "@/components/card";
import { Button, ButtonContainer } from "@/components/button";

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
  const router = useRouter();

  return (
    <>
      <Title>Anlegg for oppdrettsfiske</Title>
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
      <ButtonContainer>
        <Button
          onClick={async () =>
            await router.navigate({
              href: "/create",
            })
          }
        >
          Legg til anlegg
        </Button>
      </ButtonContainer>
    </>
  );
}
