using api.Repositories.Context;
using api.Repositories.Interfaces;
using api.Repositories.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ExampleRepository : IExampleRepository
{
    private readonly ILogger<ExampleRepository> _logger;
    private readonly FiskContext _context;

    public ExampleRepository(ILogger<ExampleRepository> logger, FiskContext context)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<Example> CreateExample(Example newExample)
    {
        _context.Examples.Add(newExample);
        await _context.SaveChangesAsync();
        return newExample;
    }

    public async Task<List<Example>> GetAllExamples()
    {
        return await _context.Examples.ToListAsync();
    }

    public async Task<Example?> GetExample(string eventId)
    {
        return await _context.Examples.FindAsync(eventId);
    }

    public async Task<Example> UpdateExample(Example updatedExample)
    {
        var entry = await _context.Examples.FindAsync(updatedExample.Id);
        if (entry == null)
        {
            throw new BadHttpRequestException("Attempted to update nonexisting event.");
        }
        _context.Examples.Entry(entry).CurrentValues.SetValues(updatedExample);
        await _context.SaveChangesAsync();
        return updatedExample;
    }

    public async Task DeleteExample(string eventId)
    {
        var entry = await _context.Examples.FindAsync(eventId);
        if (entry == null)
        {
            throw new BadHttpRequestException("Attempted deletion of nonexisting event.");
        }

        _context.Examples.Remove(entry);
        await _context.SaveChangesAsync();
    }
}
