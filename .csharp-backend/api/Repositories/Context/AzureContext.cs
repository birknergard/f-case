using api.Repositories.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Context;

public class FiskContext : DbContext
{
  public FiskContext(DbContextOptions<FiskContext> options) : base(options)
  {
  }

  public DbSet<Example> Examples { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    // Declaring entities
    modelBuilder.Entity<Example>(entity =>
    {
      entity.ToTable("Example");
      entity.HasKey(obj => obj.Id);
      entity.Property(obj => obj.Id).IsRequired();
    });
  }
}
