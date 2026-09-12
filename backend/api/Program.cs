using api.Repositories.Context;
using Microsoft.EntityFrameworkCore;
using api.Repositories.Interfaces;
using api.Repositories;
using api.Services.Storage;
using api.Services.Storage.Interfaces;
using Mapster;
using api.Mapping;
using api.Exceptions;

namespace api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add controllers to builder
        builder.Services.AddControllers();

        // Policy which frontend port to communicate with backend when run locally
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalHost", policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
        });

        // Adding global exception handler
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

        // Add database context
        builder.Services.AddDbContext<FiskContext>(options =>
        {
            // Use local database when in development environment
            options.UseSqlite(builder.Configuration["LOCALCONSTRING"]);
        });

        // Add services for dependency injection
        builder.Services.AddTransient<IStorageService, LocalFileService>();

        builder.Services.AddScoped<IExampleRepository, ExampleRepository>();

        // Add and configure mapster
        TypeAdapterConfig.GlobalSettings.Scan(typeof(MappingConfig).Assembly);
        builder.Services.AddMapster();

        // Create documentation
        builder.Services.AddOpenApi("docs");

        // Create Swagger UI
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // OpenApi docs are generated when server is ran.
        app.MapOpenApi();

        if (app.Environment.IsDevelopment())
        {
            // Enable policy only in development environment
            app.UseCors("AllowLocalHost");

            // Enable Swagger UI
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Configure the HTTP request pipeline.
        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}

