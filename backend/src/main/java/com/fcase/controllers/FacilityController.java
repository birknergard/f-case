package com.fcase.controllers;

import com.fcase.models.Facility;
import com.fcase.repositories.FacilityRepo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/facility")
@RequiredArgsConstructor
public class FacilityController {
  private static final Logger log = LoggerFactory.getLogger(FacilityController.class);
  private final FacilityRepo repo;

  @GetMapping("/{msg}")
  public ResponseEntity<String> greeting(@PathVariable String msg) {
    log.info("Pinged server");
    return ResponseEntity.ok(String.format("HELLO %s!", msg));
  }

  @GetMapping()
  public ResponseEntity<String> getAll() {
    List<Facility> val = repo.fetchAll();
    for (Facility facility : val) {
      log.info(facility.toString());
    }
    return ResponseEntity.ok(val.get(0).getName());
  }
}
