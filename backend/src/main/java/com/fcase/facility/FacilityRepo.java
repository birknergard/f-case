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

  private List<String> queryFishList(String facilityId) {
    List<String> ids =
        jdbc.query(
            """
            SELECT fish_id
            FROM FacilityFish
            WHERE facility_id = :facility_id
            """,
            Map.of("facility_id", facilityId),
            ((rs, num) -> rs.getString("fish_id")));
    return ids;
  }

  private List<String> queryOrgList(String facilityId) {
    List<String> ids =
        jdbc.query(
            """
            SELECT organization_id
            FROM FacilityOrgs
            WHERE facility_id = :facility_id
            """,
            Map.of("facility_id", facilityId),
            ((rs, num) -> rs.getString("organization_id")));
    return ids;
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

  private void updateFish(List<String> newFish, String facilityId) {
    // Get current list of fish.
    var existing = queryFishList(facilityId);

    // Only continue batch processing if lists dont match
    if (!existing.containsAll(newFish)) {
      List<String> toAdd = newFish.stream().filter(id -> !existing.contains(id)).toList();
      List<String> toDelete = existing.stream().filter(id -> !newFish.contains(id)).toList();

      var addParams = batch_params(toAdd, facilityId, "fish_id");
      var deleteParams = batch_params(toDelete, facilityId, "fish_id");

      String addQuery =
          """
          INSERT INTO FacilityFish(id, name)
          VALUES(:facility_id, :fish_id)
          """;

      String deleteQuery =
          """
          DELETE FROM FacilityFish
          WHERE fish_id = :fish_id
          AND facility_id = :facility_id
          """;

      jdbc.batchUpdate(addQuery, addParams);
      jdbc.batchUpdate(deleteQuery, deleteParams);
    }
  }

  private void updateOrgs(List<String> newOrgs, String facilityId) {
    // Get current list of fish.
    var existing = queryOrgList(facilityId);

    // Only continue batch processing if lists dont match
    if (!existing.containsAll(newOrgs)) {
      List<String> toAdd = newOrgs.stream().filter(id -> !existing.contains(id)).toList();
      List<String> toDelete = existing.stream().filter(id -> !newOrgs.contains(id)).toList();

      var addParams = batch_params(toAdd, facilityId, "fish_id");
      var deleteParams = batch_params(toDelete, facilityId, "fish_id");

      String addQuery =
          """
          INSERT INTO FacilityOrgs(id, name)
          VALUES(:facility_id, :organization_id)
          """;

      String deleteQuery =
          """
          DELETE FROM FacilityOrgs
          WHERE organization_id = :organization_id
          AND facility_id = :facility_id
          """;

      jdbc.batchUpdate(addQuery, addParams);
      jdbc.batchUpdate(deleteQuery, deleteParams);
    }
  }

  public Facility update(Facility facility, List<String> fishes, List<String> orgs) {
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

    updateFish(fishes, facility.getId());
    updateOrgs(orgs, facility.getId());
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
