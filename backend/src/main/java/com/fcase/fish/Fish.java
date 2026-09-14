package com.fcase.fish;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Fish {
  @NonNull private String id;
  @NonNull private String name;
}
