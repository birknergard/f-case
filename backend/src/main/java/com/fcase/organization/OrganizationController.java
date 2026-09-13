package com.fcase.organization;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/organization")
@CrossOrigin
@RequiredArgsConstructor
public class OrganizationController {
  private static final Logger logger = LoggerFactory.getLogger(OrganizationController.class);
  private final OrganizationRepo repo;

  @GetMapping()
  public ResponseEntity<List<Organization>> getAll() {
    List<Organization> dtos = repo.queryAll();
    return ResponseEntity.ok(dtos);
  }
}
