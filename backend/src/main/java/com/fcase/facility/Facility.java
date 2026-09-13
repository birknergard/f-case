package com.fcase.facility;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Facility {
  @NonNull private Double id;
  @NonNull private String name;
  @NonNull private String locationType;
  @NonNull private Date created;
}
