package com.fcase.facility.repos;

import com.fcase.facility.mappers.FacilityMapper;
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
public class FacilityRepo {
  private final NamedParameterJdbcTemplate jdbc;
  private final FacilityMapper rowMapper;

  // Fetches list without species and organizations, for simple representation
  public List<Facility> fetchAll() {
    List<Facility> facilities =
        jdbc.query(
            """
            SELECT id, name, location_type, created
            FROM Facility
            """,
            rowMapper);

    return facilities;
  }

  public Facility fetch(String facilityId) {
    String sql =
        """
        SELECT id, name, location_type, created
        FROM Facility
        WHERE id = :facility_id
        """;

    Facility facility = jdbc.queryForObject(sql, Map.of("facility_id", facilityId), rowMapper);
    return facility;
  }
}
