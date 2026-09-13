package com.fcase.facility.mappers;

import com.fcase.facility.models.Facility;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class FacilityMapper implements RowMapper<Facility> {
  public Facility mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Facility(
        rs.getString("id"),
        rs.getString("name"),
        rs.getString("location_type"),
        rs.getDate("created"));
  }
}
