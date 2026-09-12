namespace api.Tests;

public class GeneralTest
{
    [Fact]
    public void AssertFailed()
    {
        Assert.False(true is not false);
    }
}
