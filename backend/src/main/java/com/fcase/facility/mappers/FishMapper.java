package com.fcase.facility.mappers;

import com.fcase.facility.models.Fish;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class FishMapper implements RowMapper<Fish> {
  public Fish mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Fish(rs.getDouble("id"), rs.getString("name"));
  }
}
