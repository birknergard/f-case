package com.fcase.fish;

import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FishRepo {
  private final NamedParameterJdbcTemplate jdbc;
  private final FishMapper rowMapper;

  public List<Fish> queryAll() {
    String sql =
        """
        SELECT id, name
        FROM Fish
        """;

    List<Fish> fishes = jdbc.query(sql, rowMapper);
    return fishes;
  }

  public List<Fish> queryByFacility(String facilityId) {
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
