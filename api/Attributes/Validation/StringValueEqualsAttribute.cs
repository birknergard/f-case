using System.ComponentModel.DataAnnotations;

namespace api.Attributes.Validation;

[AttributeUsage(AttributeTargets.Property |
  AttributeTargets.Field, AllowMultiple = false)]
sealed public class StringValueEquals : ValidationAttribute
{
  private readonly string[] _allowedStringValues;

  public StringValueEquals(params string[] allowedStrings)
  {
    _allowedStringValues = allowedStrings;
    ErrorMessage = "The field {0} not in list of allowed strings for field.";
  }

  public override bool IsValid(object? value)
  {
    if (value == null) return true;
    if (value is not string s) return false;
    return _allowedStringValues.Contains(s.ToLower());
  }
}
