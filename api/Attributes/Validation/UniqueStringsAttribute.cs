using System.ComponentModel.DataAnnotations;

namespace api.Attributes.Validation;

[AttributeUsage(AttributeTargets.Property |
  AttributeTargets.Field, AllowMultiple = false)]
sealed public class UniqueStringsAttribute : ValidationAttribute
{
  public UniqueStringsAttribute()
  {
    ErrorMessage = "The list {0} does not contain fully unique strings.";
  }
  public override bool IsValid(object? value)
  {
    if (value == null) return true;
    if (value is not ICollection<string> s) return false;

    var list = s.ToArray();
    var set = new HashSet<string>();
    for (int i = 0; i < list.Length; i++)
    {
      var sizeBefore = set.Count;
      set.Add(list[i].ToUpper());

      // Set size didnt change, meaning a non unique value was added
      if (set.Count == sizeBefore) return false;
    }
    return true;
  }
}
