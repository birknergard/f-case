package com.fcase.organization;

import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class OrganizationRepo {
  private final NamedParameterJdbcTemplate jdbc;
  private final OrganizationMapper rowMapper;

  public List<Organization> queryAll() {
    String sql =
        """
        SELECT org.id AS id, org.name AS name
        FROM FacilityOrgs
        """;
    List<Organization> orgs = jdbc.query(sql, rowMapper);
    return orgs;
  }

  public List<Organization> queryByFacility(Double facilityId) {
    String sql =
        """
        SELECT org.id AS id, org.name AS name
        FROM FacilityOrgs
        JOIN Organization as org ON organization_id = id
        WHERE facility_id = :facility_id
        """;

    List<Organization> orgs = jdbc.query(sql, Map.of("facility_id", facilityId), rowMapper);

    return orgs;
  }
}
