using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleMapApp.Models;

namespace BattleMapApp.Session
{
    public interface IGameSession
    {
        bool IsGmPresent { get; set; }
        string GmAccessString { get; set; }
        Game Game { get; set; }
        bool TryAssignUserAsGm(User user);
        void AssignUserAsPlayer(User user);
    }
}
