using api.Services.Storage.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class FileController : ControllerBase
{
    private readonly IStorageService _storage;
    private readonly ILogger<FileController> _logger;

    public FileController(IStorageService storage, ILogger<FileController> logger)
    {
        _storage = storage ?? throw new ArgumentNullException(nameof(storage));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet("{*path}")]
    public async Task<IActionResult> GetFile(string path)
    {
        var blobStream = await _storage.GetFile(path);
        if (blobStream == null)
        {
            return NotFound("Could not find file on that name.");
        }

        return File(
            blobStream.File,
            blobStream.ContentType
        );
    }
}
