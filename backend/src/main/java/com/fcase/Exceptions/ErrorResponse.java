package com.fcase.Exceptions;

import lombok.Data;

@Data
public class ErrorResponse {
  private int status;
  private String message;

  public ErrorResponse(int status, String message) {
    this.message = message;
    this.status = status;
  }
}
