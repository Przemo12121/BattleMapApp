using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using BattleMapApp.UsersMapping;
using BattleMapApp.Session;


namespace BattleMapApp.Hubs
{
    public class SessionHub : Hub
    {
        private readonly static UsersMapping<string> _activeUsers =
            new UsersMapping<string>();
        /*private static IGameSession _gameSession;

        public SessionHub(IGameSession gameSession)
        {
            _gameSession = gameSession;
        }*/

        public override Task OnConnectedAsync()
        {
            string key = Context.GetHttpContext().Request.Query["AccessString"];
            _activeUsers.Add(key, Context.ConnectionId);

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            string key = Context.GetHttpContext().Request.Query["AccessString"];
            _activeUsers.Remove(key, Context.ConnectionId);

            return base.OnDisconnectedAsync(exception);
        }

        public async Task MoveToken(string tokenId, double newPosX, double newPosY)
        {
            await Clients.Others.SendAsync("MoveToken", tokenId, newPosX, newPosY);
        }

        public async Task DrawFog(double x, double y, double width, double height)
        {
            await Clients.Others.SendAsync("DrawFog", x, y, width, height);
        }
        public async Task ClearFog(double x, double y, double width, double height)
        {
            await Clients.Others.SendAsync("ClearFog", x, y, width, height);
        }
        public async Task FogAllMap()
        {
            await Clients.Others.SendAsync("FogAllMap");
        }
        public async Task ClearAllFog()
        {
            await Clients.Others.SendAsync("ClearAllFog");
        }

        public async Task SetScale(double value)
        {
            await Clients.Others.SendAsync("SetScale", value);
        }
        public async Task Reload()
        {
            await Clients.Others.SendAsync("Reload");
        }

        public async Task DrawGrid()
        {
            await Clients.Others.SendAsync("DrawGrid");
        }

        public async Task CreateNewToken(string imagePath, string tokenId, string alignment)
        {
            await Clients.Others.SendAsync("CreateNewToken", imagePath, tokenId, alignment);
        }

        public async Task RemoveToken(string name)
        {
            await Clients.Others.SendAsync("RemoveToken", name);
        }

        public async Task ChangeAlignment(string token, string color)
        {
            await Clients.Others.SendAsync("ChangeAlignment", token, color);
        }
    }
}
