using api.Services.Storage.Interfaces;
using api.Services.Storage.Models;
using api.Utilities;

namespace api.Services.Storage;

public class LocalFileService : IStorageService
{
  private readonly ILogger<LocalFileService> _logger;
  private readonly string _rootPath;

  public LocalFileService(IWebHostEnvironment env, ILogger<LocalFileService> logger)
  {
    _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    _rootPath = Path.Combine(env.ContentRootPath, "Storage"); // ROOT folder
  }

  private string GetFullPath(string relativePath)
  {
    return Path.Combine(_rootPath, relativePath);
  }

  public async Task<BlobStream> GetFile(string path)
  {
    var fullPath = GetFullPath(path);

    if (!File.Exists(fullPath))
    {
      _logger.LogInformation("File does not exist");
      throw new BadHttpRequestException("File does not exist");
    }

    var memoryStream = new MemoryStream();
    using (var fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read))
    {
      await fileStream.CopyToAsync(memoryStream);
    }

    if (memoryStream.Length == 0)
    {
      _logger.LogInformation("File is empty");
      throw new Exception("File is empty");
    }

    memoryStream.Position = 0;

    var contentType = GetContentType(fullPath);
    return new BlobStream(memoryStream, contentType);
  }

  private async Task<string> UploadImage(string directory, string hashedFileName, IFormFile file)
  {
    if (!StringHasher.IsSha256Hash(hashedFileName))
      throw new Exception("Attempted to upload file with unhashed name.");

    var relativePath = Path.Combine(directory, hashedFileName);
    var fullPath = GetFullPath(relativePath);

    var folder = Path.GetDirectoryName(fullPath);
    if (!Directory.Exists(folder))
    {
      Directory.CreateDirectory(folder!);
    }

    // Overwrite if exists
    using (var stream = new FileStream(fullPath, FileMode.Create, FileAccess.Write))
    {
      await file.CopyToAsync(stream);
    }

    return relativePath.Replace("\\", "/"); // normalize for URLs
  }

  private Task<bool> DeleteFile(string directory, string fileName)
  {
    var fullPath = GetFullPath(Path.Combine(directory, fileName));

    if (!File.Exists(fullPath))
      return Task.FromResult(false);

    File.Delete(fullPath);
    return Task.FromResult(true);
  }

  public Task<bool> DeleteFileByPath(string path)
  {
    var fullPath = GetFullPath(path);

    if (!File.Exists(fullPath))
      return Task.FromResult(false);

    File.Delete(fullPath);
    return Task.FromResult(true);
  }

  public async Task<string> UploadExampleImage(IFormFile image, string exampleId)
  {
    return await UploadImage("exampleImage", exampleId, image);
  }

  public async Task<bool> DeleteExampleImage(string eventId)
  {
    return await DeleteFile("exampleImage", eventId);
  }

  private string GetContentType(string path)
  {
    var ext = Path.GetExtension(path).ToLowerInvariant();

    return ext switch
    {
      ".jpg" or ".jpeg" => "image/jpeg",
      ".png" => "image/png",
      ".gif" => "image/gif",
      ".mp4" => "video/mp4",
      _ => "application/octet-stream"
    };
  }
}
