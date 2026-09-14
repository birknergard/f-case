package com.fcase.fish;

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
@RequestMapping("/api/fish")
@CrossOrigin
@RequiredArgsConstructor
public class FishController {
  private static final Logger logger = LoggerFactory.getLogger(FishController.class);
  private final FishRepo repo;

  @GetMapping()
  public ResponseEntity<List<Fish>> getFishes() {
    List<Fish> dtos = repo.queryAll();
    return ResponseEntity.ok(dtos);
  }
}
