import { Button } from "@/components/button";
import { CardContainer, Row } from "@/components/flex";
import { BigText, Heading, SmallText } from "@/components/text";
import { FacilityControllerService } from "@/generated";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/info/$facilityId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const facility = await FacilityControllerService.getFacility(
      params.facilityId,
    );
    return { facility };
  },
  onError: notFound,
});

function RouteComponent() {
  const { facility } = Route.useLoaderData();
  return (
    <>
      <Heading>
        Anlegg {facility.details!.name}, {facility.details!.locationType}
      </Heading>
      <SmallText>Opprettet: {facility.details!.created}</SmallText>
      <Heading>Fiskearter på anlegg</Heading>
      <Row>
        {facility.fish!.map((fish) => (
          <SmallText>{fish.name}</SmallText>
        ))}
      </Row>
      <Heading>Organisasjoner</Heading>
      <Row>
        {facility.organizations!.map((org) => (
          <SmallText>{org.name}</SmallText>
        ))}
      </Row>
      <Row>
        <Link
          to="/edit/$facilityId"
          params={{ facilityId: facility.details!.id! }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button>Rediger</Button>
        </Link>
      </Row>
    </>
  );
}
