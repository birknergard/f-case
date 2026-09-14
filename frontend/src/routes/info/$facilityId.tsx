import { Button, ButtonContainer } from "@/components/button";
import { DetailSection, ListSection, Row } from "@/components/flex";
import { Label, SmallText, Title } from "@/components/text";
import { FacilityControllerService } from "@/generated";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { format } from "date-fns";

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
  const router = useRouter();
  return (
    <>
      <Title>{facility.details!.name}</Title>

      <DetailSection>
        <Label>Opprettet:</Label>
        <SmallText>
          {format(facility.details!.created!, "dd/MM/yyyy")}
        </SmallText>
      </DetailSection>

      <DetailSection>
        <Label>Sted:</Label>
        <SmallText>{facility.details!.locationType}</SmallText>
      </DetailSection>

      <ListSection>
        <Label>Fiskearter på anlegg</Label>
        <Row>
          {facility.fish!.map((fish, i) => (
            <SmallText key={fish.id}>
              {fish.name}
              {facility.fish!.length > 1 &&
                i < facility.fish!.length - 1 &&
                ","}
            </SmallText>
          ))}
        </Row>
      </ListSection>

      <ListSection>
        <Label>Organisasjoner</Label>
        {facility.organizations!.map((org) => (
          <SmallText key={org.id!}>{org.name}</SmallText>
        ))}
      </ListSection>
      <Row>
        <ButtonContainer>
          <Button
            onClick={async () => {
              await router.invalidate({
                sync: true,
              });
              await router.navigate({
                to: "/edit/$facilityId",
                params: { facilityId: facility.details!.id! },
              });
            }}
          >
            Rediger anlegg
          </Button>
        </ButtonContainer>
      </Row>
    </>
  );
}
