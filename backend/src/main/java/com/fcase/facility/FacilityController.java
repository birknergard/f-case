package com.fcase.facility;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
  public ResponseEntity<FacilityDto> get(@PathVariable Double facilityId) {
    FacilityDto dto = builder.get(facilityId);
    return ResponseEntity.ok(dto);
  }

  @GetMapping()
  public ResponseEntity<List<FacilityDto>> getAll() {
    List<FacilityDto> dtos = builder.getAll();
    return ResponseEntity.ok(dtos);
  }

  @PostMapping
  public ResponseEntity<FacilityDto> post(@RequestBody FacilityDto dto) {
    var result = builder.create(dto);
    return ResponseEntity.ok(result);
  }

  @PutMapping
  public ResponseEntity<FacilityDto> put(@RequestBody FacilityDto dto) {
    var result = builder.update(dto);
    return ResponseEntity.ok(result);
  }

  @DeleteMapping("/{facilityId}")
  public ResponseEntity<Double> delete(@PathVariable Double facilityId) {
    var result = builder.remove(facilityId);
    return ResponseEntity.ok(result);
  }
}
