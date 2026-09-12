using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace api.Attributes.Validation;

[AttributeUsage(AttributeTargets.Property |
  AttributeTargets.Field, AllowMultiple = false)]
sealed public class DateFormatAttribute : ValidationAttribute
{
  private const string ISO8601_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.fffK";

  public DateFormatAttribute()
  {
    ErrorMessage = $"The field {{0}} must be a valid ISO 8601 formatted date ({ISO8601_FORMAT}).";
  }

  public override bool IsValid(object? value)
  {
    if (value == null) return true;
    if (value is not string s) return false;

    return DateTime.TryParseExact(s, ISO8601_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime _);
  }
}
