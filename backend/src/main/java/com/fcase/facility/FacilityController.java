package com.fcase.facility;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/facility")
@CrossOrigin
@RequiredArgsConstructor
public class FacilityController {
  private static final Logger logger = LoggerFactory.getLogger(FacilityController.class);
  private final FacilityFactory builder;

  @GetMapping("/{facilityId}")
  public ResponseEntity<FacilityDto> get(@PathVariable String facilityId) {
    FacilityDto dto = builder.getDto(facilityId);
    return ResponseEntity.ok(dto);
  }

  @GetMapping()
  public ResponseEntity<List<FacilityDto>> getAll() {
    List<FacilityDto> dtos = builder.getAll();
    return ResponseEntity.ok(dtos);
  }

  // TODO Update

  // TODO Create

  // TODO Delete
}
