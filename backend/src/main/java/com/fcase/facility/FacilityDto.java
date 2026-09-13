package com.fcase.facility;

import com.fcase.facility.models.*;
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
  private List<Fish> species = new ArrayList<>();
  private List<Organization> orgs = new ArrayList<>();
}
