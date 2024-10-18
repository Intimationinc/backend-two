using Microsoft.AspNetCore.Mvc;

namespace CacheHeader.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CacheAttributeController : ControllerBase
{
    [HttpGet]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
    public IActionResult GetPublic()
    {
        return Ok($"Current time is: {DateTime.Now}");
    }

    [HttpGet]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Client)]
    public IActionResult GetPrivate()
    {
        return Ok($"Current time is: {DateTime.Now}");
    }

    [HttpGet]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.None)]
    public IActionResult GetNoCache()
    {
        return Ok($"Current time is: {DateTime.Now}");
    }

    [HttpGet]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any, NoStore = true)]
    public IActionResult GetNoStore()
    {
        return Ok($"Current time is: {DateTime.Now}");
    }

    [HttpGet]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any, VaryByHeader = "User-Agent")]
    public IActionResult GetVary()
    {
        return Ok($"Current time is: {DateTime.Now}");
    }
}
