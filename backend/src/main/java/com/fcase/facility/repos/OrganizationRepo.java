package com.fcase.facility.repos;

import com.fcase.facility.mappers.OrganizationMapper;
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
public class OrganizationRepo {
  private final NamedParameterJdbcTemplate jdbc;
  private final OrganizationMapper rowMapper;

  public List<Organization> fetchByFacility(Double facilityId) {
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
