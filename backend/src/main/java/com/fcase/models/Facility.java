package com.fcase.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Facility {
  @NonNull private String id;
  @NonNull private String name;
}
