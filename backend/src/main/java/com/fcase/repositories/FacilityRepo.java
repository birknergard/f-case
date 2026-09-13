package com.fcase.repositories;

import com.fcase.models.Facility;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FacilityRepo {
  private final JdbcTemplate jdbcTemplate;

  public List<Facility> fetchAll() {
    return jdbcTemplate.query(
        "SELECT id, name FROM Facility",
        (resultSet, n) -> new Facility(resultSet.getString("id"), resultSet.getString("name")));
  }
}
