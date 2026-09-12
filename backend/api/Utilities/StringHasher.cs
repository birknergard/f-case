using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace api.Utilities;

public static class StringHasher
{
    public static string GetSHA256(string input)
    {
        byte[] inputBytes = Encoding.UTF8.GetBytes(input);
        byte[] hashedBytes = SHA256.HashData(inputBytes);
        return Convert.ToHexStringLower(hashedBytes);
    }

    public static bool IsSha256Hash(string input)
    {
        // SHA-256 hashes are 64 characters long and contain only the characters 0-9, a-f, or A-F
        return new Regex("^[a-fA-F0-9]{64}$").IsMatch(input);
    }

    public static string GenerateHashedID()
    {
        return GetSHA256(Guid.NewGuid().ToString());
    }
}
