using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Dto.Example;

public class ExampleDto
{
    // Unique id is generated serverside
    [Required]
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("Name")]
    public string Name { get; set; }

    [JsonPropertyName("Image")]
    public string Image { get; set; }
}
