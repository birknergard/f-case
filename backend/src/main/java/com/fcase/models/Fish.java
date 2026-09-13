package com.fcase.models;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Fish {
  private UUID id;
  private String name;
}
