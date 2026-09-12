package com.fcase.Repositories;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import org.springframework.beans.factory.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.*;

@Component
public class ConnectionHandler {

  private final Environment env;

  @Autowired
  public ConnectionHandler(Environment env) {
    this.env = env;
  }

  public String getUrl() {
    return this.env.getProperty("spring.datasource.url");
  }

  public Connection getConnection() throws Exception {
    String url = getUrl();
    if (url == null || url.isBlank()) {
      throw new IOException("Could not load url from config file");
    }
    return DriverManager.getConnection(url);
  }
}
