package com.fcase.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/facility")
public class FacilityController {

  @GetMapping("/{msg}")
  public ResponseEntity<String> greeting(@PathVariable String msg) {
    return ResponseEntity.ok(String.format("HELLO %s!", msg));
  }
}
