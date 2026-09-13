package com.fcase.facility.repos;

import com.fcase.facility.mappers.FishMapper;
import com.fcase.facility.models.*;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@ToString
public class FishRepo {
  private final NamedParameterJdbcTemplate jdbc;
  private final FishMapper rowMapper;

  public List<Fish> fetchByFacility(String facilityId) {
    String sql =
        """
        SELECT fish.id, fish.name
        FROM FacilityFish
        WHERE facility_id = ?
        LEFT JOIN Fish as fish.id ON fish_id == id
        """;

    List<Fish> fishes =
        jdbc.query(sql, Collections.singletonMap("facility_id", facilityId), rowMapper);

    return fishes;
  }
}
