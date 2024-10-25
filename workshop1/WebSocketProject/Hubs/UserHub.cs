using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using WebSocketProject.Models;

namespace WebSocketProject.Hubs;

[Authorize]
public class UserHub : Hub
{
    private readonly IList<Group> _groupList;
    public UserHub(IList<Group> groupList)
    {
        _groupList = groupList;
    }
    public async Task SendPublicMessage(string message)
    {
        string user = "test";
        await Clients.All.SendAsync("ReceiveMessage", user, message, DateTime.Now);
    }

    public async Task JoinOrCreateGroup(string userName, string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        Group? group = _groupList.FirstOrDefault(group => group.Name == groupName);
        string message = "";

        if (group == null)
        {
            group = new Group() { Name = groupName, Users = new List<string>() };
            _groupList.Add(group);
            message = $"{userName} has created the group";
        }
        else
        {
            message = $"{userName} has joined the group";
        }

        group.Users.Add(userName);

        await Clients.Group(group.Name).SendAsync("RecieveGroupMessage", "NoUser", message, groupName, DateTime.Now);
    }

    public async Task SendGroupMessage(string userName, string message, string groupName)
    {
        Group? group = _groupList.FirstOrDefault(group => group.Name == groupName);

        if (group == null || !group.Users.Any(user => user == userName)) return;

        await Clients.Group(groupName).SendAsync("RecieveGroupMessage", userName, message, groupName, DateTime.Now);
    }


}
