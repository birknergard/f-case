package com.fcase.Controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/facility")
public class FacilityController {
  private static final Logger log = LoggerFactory.getLogger(FacilityController.class);

  @GetMapping("/{msg}")
  public ResponseEntity<String> greeting(@PathVariable String msg) {
    log.info("Pinged server");
    return ResponseEntity.ok(String.format("HELLO %s!", msg));
  }
}
