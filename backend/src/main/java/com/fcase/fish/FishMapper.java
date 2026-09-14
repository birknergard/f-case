package com.fcase.fish;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class FishMapper implements RowMapper<Fish> {
  public Fish mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Fish(rs.getString("id"), rs.getString("name"));
  }
}
