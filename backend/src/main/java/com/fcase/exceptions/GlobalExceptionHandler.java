package com.fcase.exceptions;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleBadRequestException(
      MethodArgumentNotValidException ex) {
    ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
    ex.printStackTrace();
    return new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(DuplicateKeyException.class)
  public ResponseEntity<ErrorResponse> handleDuplicateKeyException(DuplicateKeyException ex) {
    ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
    ex.printStackTrace();
    return new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException ex) {
    ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
    ex.printStackTrace();
    return new ResponseEntity<ErrorResponse>(error, HttpStatus.NOT_FOUND);
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(EmptyResultDataAccessException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(EmptyResultDataAccessException ex) {
    ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
    ex.printStackTrace();
    return new ResponseEntity<ErrorResponse>(error, HttpStatus.NOT_FOUND);
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleAnyException(Exception ex) {
    ErrorResponse error =
        new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
    ex.printStackTrace();
    return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
