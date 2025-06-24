package com.prashant.apna.bazar.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobelExceptionHandler {

  // handle all the exceptions globally
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorDetails> handleAllException(Exception ex, WebRequest request) {
    // create error details object
    ErrorDetails errorDetails = new ErrorDetails();
    errorDetails.setDetails(request.getDescription(false));
    errorDetails.setMessage(ex.getMessage());
    errorDetails.setTimestamp(String.valueOf(System.currentTimeMillis()));
    // return response entity
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetails);

  }

  // handle resource not found exception
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException ex,
      WebRequest request) {
    // create error details object
    ErrorDetails errorDetails = new ErrorDetails();
    errorDetails.setDetails(request.getDescription(false));
    errorDetails.setMessage(ex.getMessage());
    errorDetails.setTimestamp(new Date().toString());
    // return response entity
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorDetails);
  }

  // handle UsernameNotFoundException
  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<ErrorDetails> handleUsernameNotFoundExcepection(UsernameNotFoundException ex,
      WebRequest request) {
    ErrorDetails errorDetails = new ErrorDetails();
    errorDetails.setDetails(request.getDescription(false));
    errorDetails.setMessage(ex.getMessage());
    errorDetails.setTimestamp(new Date().toString());
    // return response
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorDetails);
  }
}
