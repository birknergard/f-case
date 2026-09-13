package com.fcase.facility.repos;

import com.fcase.facility.mappers.OrganizationMapper;
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
public class OrganizationRepo {
  private final NamedParameterJdbcTemplate jdbc;
  private final OrganizationMapper rowMapper;

  public List<Organization> fetchByFacility(String facilityId) {
    String sql =
        """
        SELECT org.id, org.name
        FROM FacilityAffiliate
        WHERE facility_id = ?
        LEFT JOIN FacilityAffiliate as org ON facility_id == id
        """;

    List<Organization> orgs =
        jdbc.query(sql, Collections.singletonMap("facility_id", facilityId), rowMapper);

    return orgs;
  }
}
