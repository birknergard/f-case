import {
  FacilityControllerService,
  type FacilityDto,
  type Fish,
  type Organization,
} from "@/generated";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { endOfDay, parseISO, isFuture, formatISO } from "date-fns";
import { Label } from "@/components/text";
import { Form, Input, InputCheckbox, InputRadio } from "@/components/input";
import DatePicker from "react-datepicker";
import {
  Column,
  ShrinkingRow,
  ListSection,
  DetailSection,
} from "@/components/flex";
import { v4 as uuidv4 } from "uuid";
import { Button, ButtonContainer } from "@/components/button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useRouter } from "@tanstack/react-router";
import { confirm } from "./confirm";

interface FormInput {
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

  const { mutateAsync: post, isPending: isPosting } = useMutation({
    mutationFn: FacilityControllerService.postFacility,
  });

  const { mutateAsync: update, isPending: isUpdating } = useMutation({
    mutationFn: FacilityControllerService.putFacility,
  });

  const { mutateAsync: remove, isPending: isDeleting } = useMutation({
    mutationFn: FacilityControllerService.deleteFacility,
  });

  const handleDelete = async (id: string) => {
    const hasConfirmed = await confirm({
      message: "Er du sikker på at du vil slette anlegget?",
    });
    if (hasConfirmed) {
      await remove(id);
      router.navigate({
        href: "/",
      });
    }
  };

  const onSubmit = async (data: FormInput) => {
    const dto: FacilityDto = {
      details: {
        id: initialData?.details?.id ?? uuidv4(),
        name: data.name,
        locationType: data.locationType,
        created: formatISO(data.created),
      },
      fish: data.fish,
      organizations: data.organizations,
    };
    if (initialData) {
      console.debug("put dto:", dto);
      await update(dto);
      router.navigate({
        to: "/info/$facilityId",
        params: { facilityId: initialData.details!.id! },
        replace: true,
      });
    } else {
      console.debug("post dto:", dto);
      await post(dto);
      router.navigate({
        href: "/",
      });
    }
  };
  const onError = () => {
    console.error("Failed submit");
  };

  if (isPosting || isUpdating || isDeleting) return <CircularProgress />;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <ShrinkingRow>
        <Column>
          <DetailSection>
            <Label>Navn</Label>
            <Input
              defaultValue={initialData?.details?.name ?? ""}
              placeholder="Skriv inn navn ..."
              {...register("name", { required: true })}
            />
          </DetailSection>
          <DetailSection>
            <Label>Sted</Label>
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
          </DetailSection>
          <DetailSection>
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
          </DetailSection>
          <ListSection>
            <Label>Fiskearter</Label>
            <Controller
              control={control}
              name="fish"
              defaultValue={initialData?.fish ?? []}
              render={({ field }) => (
                <InputCheckbox
                  options={availableFish}
                  values={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </ListSection>
        </Column>
        <ListSection>
          <Label>Tilknyttede organisasjoner</Label>
          <Controller
            control={control}
            name="organizations"
            defaultValue={initialData?.organizations ?? []}
            render={({ field }) => (
              <InputCheckbox
                options={availableOrganizations}
                values={field.value}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </ListSection>
      </ShrinkingRow>
      <ButtonContainer>
        {initialData && (
          <>
            <Button
              onClick={() =>
                router.navigate({
                  to: "/info/$facilityId",
                  params: { facilityId: initialData.details!.id! },
                })
              }
              type="button"
              $colored
            >
              Avbryt
            </Button>
            <Button
              type="button"
              $colored
              onClick={() => handleDelete(initialData.details!.id!)}
            >
              Slett
            </Button>
          </>
        )}
        <Button type="submit">{!initialData ? "Publiser" : "Lagre"}</Button>
      </ButtonContainer>
    </Form>
  );
}
