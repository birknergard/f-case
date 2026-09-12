namespace api.Utilities;

public static class DateUtilities
{
    public static IEnumerable<string> ComputeDaysInRange(this DateTime startDate, DateTime endDate)
    {
        for (DateTime dt = startDate.Date; dt <= endDate.Date; dt = dt.AddDays(1))
        {
            yield return dt.ToString("yyyy-MM-dd");
        }
    }

}
