package com.fcase.facility.repos;

import com.fcase.facility.mappers.FacilityMapper;
import com.fcase.facility.models.*;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@ToString
public class FacilityRepo {
  private final NamedParameterJdbcTemplate jdbc;
  private final FacilityMapper rowMapper;

  private boolean exists(String facilityId) {
    String sql =
        """
        SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM Facility
            WHERE id = :facility_id
        )
        """;

    boolean exists = jdbc.queryForObject(sql, Map.of("facility_id", facilityId), Boolean.class);
    return exists;
  }

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
        LIMIT 1
        """;

    Facility facility = jdbc.queryForObject(sql, Map.of("facility_id", facilityId), rowMapper);
    return facility;
  }

  public Facility create(Facility facility) {
    String sql =
        """
        INSERT INTO Facility(id, name, location_type, created)
        VALUES(:id, :name, :location_type, :created);
        """;

    var params =
        new MapSqlParameterSource()
            .addValue("id", facility.getId())
            .addValue("name", facility.getName())
            .addValue("created", facility.getCreated())
            .addValue("location_type", facility.getLocationType());

    jdbc.update(sql, params);

    return facility;
  }

  public Facility update(Facility facility) {
    String sql =
        """
        UPDATE Facility
        SET
            name = :name,
            location_type = :location_type,
            created = :created
        WHERE id = :id
        """;

    var params =
        new MapSqlParameterSource()
            .addValue("id", facility.getId())
            .addValue("name", facility.getName())
            .addValue("created", facility.getCreated())
            .addValue("location_type", facility.getLocationType());

    jdbc.update(sql, params);

    return facility; // and here
  }

  public String remove(String facilityId) {
    String sql =
        """
          DELETE FROM Facility
          WHERE id = :id
        """;

    var params = new MapSqlParameterSource().addValue("id", facilityId);

    jdbc.update(sql, params);

    return facilityId;
  }
}
