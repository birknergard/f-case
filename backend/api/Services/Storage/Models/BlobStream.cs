using Azure.Core;

namespace api.Services.Storage.Models;

public class BlobStream
{
    public MemoryStream File { get; set; }
    public string ContentType { get; set; }

    public BlobStream(MemoryStream file, ContentType contentType)
    {
        File = file;
        ContentType = contentType.ToString();
    }

    // octet-stream as fallback ContentType
    public BlobStream(MemoryStream file)
    {
        File = file;
        ContentType = "application/octet-stream";
    }
}
