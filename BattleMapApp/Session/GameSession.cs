using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleMapApp.Models;


namespace BattleMapApp.Session
{
    public class GameSession : IGameSession
    {
        public GameSession()
        {
            Game = new Game();
            //PlayerList = new List<User>();
        }
        //public List<User> PlayerList { get; }
        public bool IsGmPresent { get; set; } = false;
        public string GmAccessString { get; set; }
        public string GmString { get; set; } = null;
        public Game Game { get; set; }

        public bool TryAssignUserAsGm(User user)
        {
            if (!IsGmPresent || GmAccessString == user.AccessString)
            {
                user.IsConnected = true;
                IsGmPresent = true;
                GmAccessString = user.AccessString;
                return true;
            }
            else
            {
                user.ReassignAsPlayer();
                return false;
            }
        }
        public void AssignUserAsPlayer(User user)
        {
            //user.AccessString = user.PlayerNickname + user.CharacterName;
            user.IsConnected = true;
        }
    }
}
