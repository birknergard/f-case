package com.fcase.facility;

import com.fcase.interfaces.DataEntry;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Facility implements DataEntry {
  @NonNull private String id;
  @NonNull private String name;
  @NonNull private String locationType;
  @NonNull private Date created;
}
