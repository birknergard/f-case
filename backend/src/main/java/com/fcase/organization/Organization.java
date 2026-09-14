package com.fcase.organization;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Organization {
  @NonNull private String id;
  @NonNull private String name;
}
