using System.Text.Json;
using api.Dto.Example;
using api.Repositories.Interfaces;
using api.Repositories.Models;
using api.Services.Storage.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ExampleController : ControllerBase
{
    private readonly IExampleRepository _repo;
    private readonly IStorageService _storage;
    private readonly ILogger<ExampleController> _logger;
    private readonly IMapper _mapper;

    public ExampleController(IExampleRepository repo, IStorageService storage, ILogger<ExampleController> logger, IMapper mapper)
    {
        _repo = repo ?? throw new ArgumentNullException(nameof(repo));
        _storage = storage ?? throw new ArgumentNullException(nameof(storage));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    [HttpGet(Name = "GetExamples")]
    public async Task<ActionResult<List<ExampleDto>>> GetExamples()
    {
        var events = await _repo.GetAllExamples();
        var dto = _mapper.Map<List<ExampleDto>>(events);
        return Ok(dto);
    }

    [HttpGet("{id}", Name = "GetExample")]
    public async Task<ActionResult<ExampleDto>> GetExampleById(string id)
    {
        var entry = await _repo.GetExample(id);
        if (entry == null)
        {
            _logger.LogWarning($"ExampleController: not found on id: {id}");
            return NotFound("Example not found");
        }

        var dto = _mapper.Map<ExampleDto>(entry);
        return Ok(dto);
    }

    [HttpPost(Name = "PostExample")]
    public async Task<ActionResult<ExampleDto>> PostExample(
            [FromForm] ExampleRequest request)
    {
        ExampleDto body = JsonSerializer.Deserialize<ExampleDto>(request.ExampleJson)!;
        var newExample = _mapper.Map<Example>(body);

        // Upload image if supplied
        if (request.ImageFile != null)
        {
            var imageUrl = await _storage.UploadExampleImage(request.ImageFile!, newExample.Id);
            newExample.Image = $"{Request.Scheme}://{Request.Host}/File/{imageUrl}";
        }

        var created = await _repo.CreateExample(newExample);
        var dto = _mapper.Map<ExampleDto>(created);
        return Ok(dto);
    }

    [HttpPut(Name = "PutExample")]
    public async Task<ActionResult<ExampleDto>> PutExample([FromForm] ExampleRequest request)
    {
        var body = JsonSerializer.Deserialize<ExampleDto>(request.ExampleJson)!;
        var entry = _mapper.Map<Example>(body);

        if (request.ImageFile != null)
        {
            var imagePath = await _storage.UploadExampleImage(request.ImageFile, body.Id);
            entry.Image = $"{Request.Scheme}://{Request.Host}/File/{imagePath}";
        }

        var result = await _repo.UpdateExample(entry);
        var dto = _mapper.Map<ExampleDto>(result);
        return Ok(dto);
    }

    [HttpDelete("{id}", Name = "DeleteExample")]
    public async Task<ActionResult<string>> DeleteExample(string id)
    {
        await _storage.DeleteExampleImage(id);
        await _repo.DeleteExample(id);

        return Ok($"Deleted on {id}");
    }
}
