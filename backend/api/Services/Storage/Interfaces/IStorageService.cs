using api.Services.Storage.Models;

namespace api.Services.Storage.Interfaces;

public interface IStorageService
{
  public Task<BlobStream> GetFile(string hash);

  public Task<string> UploadExampleImage(IFormFile image, string exampleId);

  public Task<bool> DeleteFileByPath(string path);

  public Task<bool> DeleteExampleImage(string exampleId);
}

