using api.Repositories.Models;

namespace api.Repositories.Interfaces;

public interface IExampleRepository
{
  public Task<Example> CreateExample(Example newExample);

  public Task<Example> UpdateExample(Example updatedExample);

  public Task<List<Example>> GetAllExamples();

  public Task<Example?> GetExample(string exampleId);

  public Task DeleteExample(string exampleId);
}
