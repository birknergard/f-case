package com.fcase.facility;

import com.fcase.fish.Fish;
import com.fcase.organization.Organization;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
public class FacilityDto {
  @NonNull private Facility details;
  private List<Fish> fish = new ArrayList<>();
  private List<Organization> organizations = new ArrayList<>();
}
