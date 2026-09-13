package com.fcase.facility.repos;

import com.fcase.facility.mappers.FishMapper;
import com.fcase.facility.models.*;
import java.util.List;
import java.util.Map;
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
        SELECT fish_id AS id, fish.name AS name
        FROM FacilityFish
        INNER JOIN Fish AS fish ON fish_id = fish.id
        WHERE facility_id = :facility_id
        """;

    List<Fish> fishes = jdbc.query(sql, Map.of("facility_id", facilityId), rowMapper);

    return fishes;
  }
}
