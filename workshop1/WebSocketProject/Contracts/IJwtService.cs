using WebSocketProject.Models;

namespace WebSocketProject.Contracts;

public interface IJwtService
{
    string GenerateAccessToken(User user);
}
