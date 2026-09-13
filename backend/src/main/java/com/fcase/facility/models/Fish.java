package com.fcase.facility.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Fish {
  @NonNull private Double id;
  @NonNull private String name;
}
