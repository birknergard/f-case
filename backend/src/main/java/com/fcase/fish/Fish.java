package com.fcase.fish;

import com.fcase.interfaces.DataEntry;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Fish implements DataEntry {
  @NonNull private String id;
  @NonNull private String name;
}
