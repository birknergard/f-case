import {
  FacilityControllerService,
  type FacilityDto,
  type Fish,
  type Organization,
} from "@/generated";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { endOfDay, format, parseISO, isFuture } from "date-fns";
import { Heading, Label } from "@/components/text";
import { Input, InputCheckbox, InputRadio } from "@/components/input";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";
import { useEffect } from "react";

interface IFormInput {
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
  const { control, register, handleSubmit } = useForm<IFormInput>();
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

  useEffect(() => {
    console.log(initialData);
  }, []);

  return (
    <Container>
      <Row>
        <Label>Navn</Label>
        <Input
          defaultValue={initialData?.details?.name ?? ""}
          {...register("name")}
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
              value={field.value}
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
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </Column>
    </Container>
  );
}

export const Container = styled(Column)``;
