using CacheHeader.Filters;
using Microsoft.AspNetCore.Mvc;

namespace CacheHeader.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ETagTestController : ControllerBase
{
    [HttpGet]
    [ETagFilter]
    public IActionResult GetItem()
    {
        var data = new
        {
            name = "Test Name",
            age = 24
        };

        return Ok(data);
    }
}
