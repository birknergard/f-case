package com.fcase.organization;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class OrganizationMapper implements RowMapper<Organization> {
  public Organization mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Organization(rs.getString("id"), rs.getString("name"));
  }
}
