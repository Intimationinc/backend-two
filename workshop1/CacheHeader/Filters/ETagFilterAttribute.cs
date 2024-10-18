using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace CacheHeader.Filters;

public class ETagFilterAttribute : ActionFilterAttribute
{
    private const string _clientETagKey = "ClientETag";

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var ifNoneMatchHeader = context.HttpContext.Request.Headers["If-None-Match"].FirstOrDefault();

        if (!string.IsNullOrEmpty(ifNoneMatchHeader))
        {
            context.HttpContext.Items[_clientETagKey] = ifNoneMatchHeader;
        }
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Result is ObjectResult objectResult && objectResult.Value != null)
        {
            var newETag = GenerateETag(objectResult.Value);

            var clientETag = context.HttpContext.Items[_clientETagKey]?.ToString();

            if (!string.IsNullOrEmpty(clientETag) && clientETag == newETag)
            {
                context.Result = new StatusCodeResult(304);
                return;
            }

            context.HttpContext.Response.Headers["ETag"] = newETag;
        }

        base.OnActionExecuted(context);
    }

    private string GenerateETag(object data)
    {
        var json = JsonSerializer.Serialize(data);
        var hash = SHA256.HashData(Encoding.UTF8.GetBytes(json));
        return Convert.ToBase64String(hash);
    }
}
