package com.fcase.facility.repos;

import com.fcase.facility.mappers.FacilityMapper;
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
            (resultSet, n) ->
                new Facility(
                    resultSet.getString("id"),
                    resultSet.getString("name"),
                    resultSet.getString("location_type"),
                    resultSet.getDate("created")));

    return facilities;
  }

  public Facility fetch(String facilityId) {
    String sql =
        """
        SELECT id, name, location_type, created
        FROM Facility
        WHERE id = ?
        """;

    Facility facility =
        jdbc.queryForObject(sql, Collections.singletonMap("id", facilityId), rowMapper);

    return facility;
  }
}
