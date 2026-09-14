import {
  FacilityControllerService,
  type FacilityDto,
  type Fish,
  type Organization,
} from "@/generated";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { endOfDay, parseISO, isFuture } from "date-fns";
import { Label } from "@/components/text";
import { Input, InputCheckbox, InputRadio } from "@/components/input";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";
import { useEffect } from "react";
import { Button } from "@/components/button";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "@tanstack/react-router";

interface FormInput {
  id: string;
  name: string;
  created: Date;
  locationType: string;
  fish: Fish[];
  organizations: Organization[];
}

export function FacilityForm({
  initialData,
  availableFish,
  availableOrganizations,
}: {
  initialData?: FacilityDto;
  availableFish: Fish[];
  availableOrganizations: Organization[];
}) {
  const router = useRouter();
  const { control, register, handleSubmit } = useForm<FormInput>();
  // Formdata
  //const [location, setLocation] = useState<string>("Land");
  //const [date, setDate] = useState(endOfDay(new Date()));
  //const [fish, setFish] = useState<Fish[]>([]);
  //const [orgs, setOrgs] = useState<Organization[]>([]);

  const { mutateAsync: post, isPending: isPosting } = useMutation({
    mutationFn: FacilityControllerService.postFacility,
    // TODO: Toast on error, success
  });

  const { mutateAsync: update, isPending: isUpdating } = useMutation({
    mutationFn: FacilityControllerService.putFacility,
    // TODO: Toast on error, success
  });

  const { mutateAsync: remove, isPending: isDeleting } = useMutation({
    mutationFn: FacilityControllerService.deleteFacility,
    // TODO: Toast on error, success
  });

  const handleDelete = async (id: string) => {
    await remove(id);
    router.navigate({
      href: "/",
    });
  };

  const onSubmit = (data: FormInput) => {
    console.log(data);
  };
  const onError = () => {
    console.error("Failed submit");
  };

  useEffect(() => {
    console.log(initialData);
  }, []);

  if (isPosting || isUpdating || isDeleting) return <CircularProgress />;

  return (
    <Container onSubmit={handleSubmit(onSubmit, onError)}>
      <Row>
        <Label>Navn</Label>
        <Input
          defaultValue={initialData?.details?.name ?? ""}
          placeholder="Skriv inn navn ..."
          {...register("name", { required: true })}
        />
      </Row>
      <Row>
        <Label>Stedtype</Label>
        <Controller
          control={control}
          name="locationType"
          defaultValue={initialData?.details?.locationType ?? "Sjø"}
          render={({ field }) => (
            <InputRadio
              options={["Sjø", "Land"]}
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </Row>
      <Row>
        <Label>Stiftet</Label>
        <Controller
          control={control}
          name="created"
          defaultValue={
            initialData
              ? parseISO(initialData.details?.created!)
              : endOfDay(new Date())
          }
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onSelect={(date) => field.onChange(date!)}
              filterDate={(date) => {
                return !isFuture(date);
              }}
            />
          )}
        />
      </Row>
      <Column>
        <Label>Fiskearter</Label>
        <Controller
          control={control}
          name="fish"
          defaultValue={initialData?.species ?? []}
          render={({ field }) => (
            <InputCheckbox
              options={availableFish}
              values={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </Column>
      <Column>
        <Label>Relaterte organisasjoner</Label>
        <Controller
          control={control}
          name="organizations"
          defaultValue={initialData?.orgs ?? []}
          render={({ field }) => (
            <InputCheckbox
              options={availableOrganizations}
              values={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </Column>

      {/* Submit buttons (update, create, delete)*/}
      <ButtonContainer>
        <Button type="submit">Publiser</Button>
        {initialData && (
          <Button onClick={() => handleDelete(initialData.details!.id!)}>
            Slett
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
}

export const Container = styled.form``;
export const ButtonContainer = styled(Row)`
  justify-content: center;
`;
