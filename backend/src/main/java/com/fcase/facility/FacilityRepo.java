package com.fcase.facility;

import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FacilityRepo {
  private final NamedParameterJdbcTemplate jdbc;
  private final FacilityMapper rowMapper;

  private MapSqlParameterSource[] batch_params(
      List<String> ids, String facilityId, String argName) {
    return ids.stream()
        .map(
            id -> {
              return new MapSqlParameterSource()
                  .addValue("facility_id", facilityId)
                  .addValue(argName, id);
            })
        .toArray(MapSqlParameterSource[]::new);
  }

  // queryes list without species and organizations, for simple representation
  public List<Facility> queryAll() {
    List<Facility> facilities =
        jdbc.query(
            """
            SELECT id, name, location_type, created
            FROM Facility
            """,
            rowMapper);

    return facilities;
  }

  public Facility queryById(String facilityId) {
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

  public Facility create(Facility facility, List<String> fishes, List<String> orgs) {
    String facility_query =
        """
        INSERT INTO Facility(id, name, location_type, created)
        VALUES(:facility_id, :name, :location_type, :created);
        """;

    String orgs_query =
        """
        INSERT INTO FacilityOrgs(facility_id, organization_id)
        VALUES(:facility_id, :org_id);
        """;

    String fish_query =
        """
        INSERT INTO FacilityFish(facility_id, fish_id)
        VALUES(:facility_id, :fish_id);
        """;

    var facility_params =
        new MapSqlParameterSource()
            .addValue("facility_id", facility.getId())
            .addValue("name", facility.getName())
            .addValue("created", facility.getCreated())
            .addValue("location_type", facility.getLocationType());
    var fish_params = batch_params(fishes, facility.getId(), "fish_id");
    var org_params = batch_params(orgs, facility.getId(), "org_id");

    jdbc.update(facility_query, facility_params);
    jdbc.batchUpdate(fish_query, fish_params);
    jdbc.batchUpdate(orgs_query, org_params);
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
