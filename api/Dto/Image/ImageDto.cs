using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Dto.Image;

public class ImageDto
{
    [Required]
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [Required]
    [Url]
    [JsonPropertyName("url")]
    public string Url { get; set; }
}
