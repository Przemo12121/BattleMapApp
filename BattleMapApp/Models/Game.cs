using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleMapApp.Models
{
    public class Game
    {
        public string MapImage { get; set; }
        public string FogImage { get; set; }
        public List<User> Players { get; set; } = new List<User>();
        public string GameMaster { get; set; }
        public List<string> Tokens { get; set; }
        public double PxPerDistance { get; set; } = 1;
        public bool IsGridShown { get; set; } = false;
    }
}
